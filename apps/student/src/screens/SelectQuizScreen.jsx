import { Dimensions, FlatList, SafeAreaView, Text, View } from "react-native";
import { ActivityIndicator, useTheme } from 'react-native-paper'
import globalStyles from '../utils/globalStyles';
import useQuizzes from "../hooks/useQuizzes";
import Card from "../components/Card";

export default function SelectQuizScreen({ navigation }) {
  const { quizzes } = useQuizzes();
  const theme = useTheme();
  
  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Confirm', { item: item })}>
      <Text>Quiz Teste</Text>
    </Card>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !quizzes ?
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
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
