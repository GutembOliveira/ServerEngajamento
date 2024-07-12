import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import globalStyles from '../utils/globalStyles';
import theme from '../theme';
import useQuizzes from '../hooks/useQuizzes';
import CardContent from '../components/CardContent';
import Podium from '../components/Podium'; // CHANGED

export default function QuizDetailScreen() {
  const route = useRoute();
  const { item } = route.params;
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { fetchQuizById } = useQuizzes();
  const [students, setStudents] = useState([]); // CHANGED
  const [loading, setLoading] = useState(true); // CHANGED

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const result = await fetchQuizById(item.id);
      setSelectedQuiz(result);
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

  // const renderItem = ({ item }) => (
  //   <CardContent>
  //     <Text>Geografia</Text>
  //     <Text>Mundo</Text>
  //     <Text>{item.descricao}</Text>
  //   </CardContent>
  // )

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        loading ? (
          <ActivityIndicator size="large" color={theme.colors.lightBlue} />
        ) : (
          <>
            <Text style={[globalStyles.text, globalStyles.heading]}>Detalhes do questionário</Text>
            <Text style={globalStyles.text}>Nome: {selectedQuiz?.name || 'Quiz teste'}</Text>
            <Text style={globalStyles.text}>Questões: {selectedQuiz?.alternativas?.length || 0}</Text>

            {/* Adicionando o Podium */}
            <Podium students={students} /> {/* CHANGED */}

            {/* <FlatList
              data={selectedQuiz?.alternativas || []}
              keyExtractor={item => item.idalternativas}
              renderItem={renderItem}
              style={{ width: Dimensions.get('window').width * 0.9 }}
            /> */}
          </>
        )
      }
    </SafeAreaView>
  );
}
