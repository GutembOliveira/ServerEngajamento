import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Text } from 'react-native';

import theme from '../theme';
import globalStyles from '../utils/globalStyles';

import useQuizzes from '../hooks/useQuizzes';
import Card from '../components/Card';

export default function ListQuizzesScreen({ navigation }) {
  const { quizzes } = useQuizzes();

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Quiz Detail', { id: item._id})}>
      <Text>{item.name}</Text>
    </Card>
  )

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
                <Text style={[globalStyles.text, globalStyles.heading]}>Meus questionários</Text>
                <FlatList
                  data={quizzes}
                  keyExtractor={item => item._id}
                  renderItem={renderItem}
                  style={{width: Dimensions.get('window').width * 0.9}}
                />
              </>
          )
      }
    </SafeAreaView>
  )
}