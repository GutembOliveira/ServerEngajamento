import { Dimensions, FlatList, SafeAreaView } from 'react-native';
import { useTheme, ActivityIndicator, Card, FAB, Text, Button } from 'react-native-paper';
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
              <Text variant="titleLarge">Não há questionários cadastrados</Text>
              :
              <>
                <Text variant="titleLarge" style={{ marginBottom: 30 }}>Meus questionários</Text>
                {/* <FlatList
                  data={quizzes}
                  keyExtractor={item => item.idQuestao}
                  renderItem={renderItem}
                  style={{width: Dimensions.get('window').width * 0.9}}
                /> */}
                {/* <Card
                  onPress={() => navigation.navigate('Quiz Detail', { item: quizzes })}
                  style={{ marginBottom: 15, paddingVertical: 15, paddingHorizontal: 40 }}>
                  <Text>Quiz Teste</Text>
                </Card> */}

                <Card style={{ width: Dimensions.get('window').width * 0.7}}>
                  <Card.Title title="Quiz Teste" subtitle="Questionário para teste"/>
              
                  <Card.Actions>
                    <Button onPress={() => navigation.navigate('Quiz Detail', { item: quizzes })}>
                      Detalhes
                    </Button>
                    <Button onPress={() => navigation.navigate('Lobby', { quiz: quizzes })}>
                      Iniciar
                    </Button>
                  </Card.Actions>

                </Card>
              </>
          )
      }
      <FAB
        icon="plus"
        style={{ position: 'absolute', margin: 15, padding: 5, right: 15, bottom: 15 }}
        onPress={() => navigation.navigate('New Quiz')}
      />
    </SafeAreaView>
  )
}