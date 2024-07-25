import { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import { ActivityIndicator, Appbar, Card, Text, useTheme } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';
import globalStyles from '../utils/globalStyles';
import useQuizzes from '../hooks/useQuizzes';
import Podium from '../components/Podium'; // CHANGED

export default function QuizDetailScreen() {
  const route = useRoute();
  const { item } = route.params;
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { fetchQuizById } = useQuizzes();
  const [students, setStudents] = useState([]); // CHANGED
  const [loading, setLoading] = useState(true); // CHANGED

  const theme = useTheme();
  const navigation = useNavigation()

  useEffect(() => {
    const fetchQuizDetails = async () => {
      //const result = await fetchQuizById(item.id);
      //setSelectedQuiz(result);
      // Simulando a obtenção dos dados dos alunos - ajuste conforme necessário
      setStudents([
        { id: 1, name: 'Aluno 1', acertos: 5 },
        { id: 2, name: 'Aluno 2', acertos: 7 },
        { id: 3, name: 'Aluno 3', acertos: 9 },
        { id: 4, name: 'Aluno 4', acertos: 6 },
      ]);
      setLoading(false); // CHANGED
    };
    fetchQuizDetails();
  }, [item.id]);

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: 15 }}>
      <Card.Content>
        <Text variant='titleSmall'>
          {item.enunciado}
        </Text>
      </Card.Content>
    </Card>
  )

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
        {
          loading ? (
            <ActivityIndicator animating={true} color={theme.colors.primary} />
          ) : (
            <View style={{ position: 'relative', top: 100 }}>
              <Text variant="titleLarge" style={{ textAlign: 'center' }}>Detalhes do questionário</Text>
              <Text variant="titleMedium" style={{ textAlign: 'center' }}>Nome: Quiz teste</Text>
              <Text variant="titleMedium" style={{ textAlign: 'center' }}>Questões: {item?.length}</Text>

              {/* Adicionando o Podium */}
              {/* <Podium students={students} />  */}
              {/* CHANGED */}

              <FlatList
                data={item}
                keyExtractor={item => item.idQuestao}
                renderItem={renderItem}
                style={{ width: Dimensions.get('window').width * 0.9 }}
              />
            </View>
          )
        }
      </SafeAreaView>
    </>
  );
}
