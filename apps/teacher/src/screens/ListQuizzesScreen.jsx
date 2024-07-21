import { Dimensions, FlatList, SafeAreaView } from 'react-native';
import { useTheme, ActivityIndicator, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../utils/globalStyles';
import useQuizzes from '../hooks/useQuizzes';

export default function ListQuizzesScreen() {
  const { quizzes } = useQuizzes();

  const navigation = useNavigation();
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Quiz Detail', { item: item })} style={{ marginBottom: 15, paddingVertical: 10 }}>
      <Card.Title title="Quiz Teste" />
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
              <Text variant="titleMedium" theme={{ colors: theme.colors.onBackground }}>Não há questionários cadastrados</Text>
              :
              <>
                <Text variant="titleMedium" theme={{ colors: theme.colors.onBackground }} style={{ marginVertical: 20 }}>Meus questionários</Text>
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