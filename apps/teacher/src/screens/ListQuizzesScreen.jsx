import { Dimensions, FlatList, SafeAreaView } from 'react-native';
import { useTheme, ActivityIndicator, Card, Text } from 'react-native-paper';

import globalStyles from '../utils/globalStyles';
import useQuizzes from '../hooks/useQuizzes';

export default function ListQuizzesScreen({ navigation }) {
  const { quizzes } = useQuizzes();

  const theme = useTheme()

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Quiz Detail', { item: item})}>
      <Card.Title title="Quiz Teste"/>
    </Card>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !quizzes ?
          <ActivityIndicator animating={true} color={theme.colors.primary} />
          :
          (
            quizzes.length === 0 ?
              <Text variant="titleMedium">Não há questionários cadastrados</Text>
              :
              <>
                <Text variant="titleMedium">Meus questionários</Text>
                <FlatList
                  data={quizzes}
                  keyExtractor={item => item.idQuestao}
                  renderItem={renderItem}
                  style={{width: Dimensions.get('window').width * 0.9}}
                />
              </>
          )
      }
    </SafeAreaView>
  )
}