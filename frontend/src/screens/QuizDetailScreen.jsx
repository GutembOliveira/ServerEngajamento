import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import globalStyles from '../utils/globalStyles';
import { useEffect, useState } from 'react';
import useQuizzes from '../hooks/useQuizzes';
import theme from '../theme';
import CardContent from '../components/CardContent';

export default function QuizDetailScreen() {
  const route = useRoute();
  const { item } = route.params;
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { fetchQuizById } = useQuizzes();

  //const { quizzes } = useQuizzes();

  useEffect(() => {
    //const getQuiz = async() => {
    // const getQuiz = async () => {
    //   const result = await fetchQuizById(id);
    //   //const result = quizzes.find(quiz => quiz.idQuestao === id);
    //   setSelectedQuiz(result);
    // }
    // getQuiz();
    setSelectedQuiz(item);
  }, []);

  const renderItem = ({ item }) => (
    <CardContent>
      <Text>Geografia</Text>
      <Text>Mundo</Text>
      <Text>{item.descricao}</Text>
    </CardContent>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
    {
      !selectedQuiz ?
      <ActivityIndicator size="large" color={theme.colors.lightBlue} />
        :
        (
          <>
            <Text style={[globalStyles.text, globalStyles.heading]}>Detalhes do questionário</Text>
            {/* <Text style={globalStyles.text}>Nome: { selectedQuiz.name }</Text> */}
            <Text style={globalStyles.text}>Nome: Quiz teste</Text>
            <Text style={globalStyles.text}>Questões: { selectedQuiz.alternativas.length }</Text>

            <FlatList
                  data={selectedQuiz.alternativas}
                  keyExtractor={item => item.idalternativas}
                  renderItem={renderItem}
                  style={{width: Dimensions.get('window').width * 0.9}}
                />
          </>
        )
    }
  </SafeAreaView>
  )
}