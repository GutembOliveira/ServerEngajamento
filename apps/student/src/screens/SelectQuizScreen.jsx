import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Text, View } from "react-native";
import globalStyles from '../utils/globalStyles';
import useQuizzes from "../hooks/useQuizzes";
import theme from "../theme";
import Card from "../components/Card";

export default function SelectQuizScreen({ navigation }) {
  const { quizzes } = useQuizzes();
  
  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Confirm', { item: item })}>
      <Text>Quiz Teste</Text>
    </Card>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !quizzes ?
          <ActivityIndicator size="large" color={theme.colors.lightBlue} />
          :
          (
            quizzes.length === 0 ?
              <Text style={globalStyles.text}>Não há questionários cadastrados</Text>
              :
              <>
                <Text style={[globalStyles.text, globalStyles.heading]}>Selecione um questionário</Text>
                <FlatList
                  data={quizzes}
                  keyExtractor={item => item.idQuestao}
                  renderItem={renderItem}
                  style={{ width: Dimensions.get('window').width * 0.9 }}
                />
              </>
          )
      }
    </SafeAreaView>
  );
}
