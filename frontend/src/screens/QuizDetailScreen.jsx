import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import globalStyles from '../utils/globalStyles';
import { useEffect, useState } from 'react';
import useQuizzes from '../hooks/useQuizzes';
import theme from '../theme';
import CardContent from '../components/CardContent';

export default function QuizDetailScreen() {
  const route = useRoute();
  const { id } = route.params;
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { fetchQuizById } = useQuizzes();

  useEffect(() => {
    const getQuiz = async() => {
      const result = await fetchQuizById(id);
      setSelectedQuiz(result);
    }

    getQuiz();
  }, []);

  const renderItem = ({ item }) => (
    <CardContent>
      <Text>{item.subject}</Text>
      <Text>{item.topic}</Text>
      <Text>{item.question}</Text>
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
            <Text style={globalStyles.text}>Nome: { selectedQuiz.name }</Text>
            <Text style={globalStyles.text}>Questões: { selectedQuiz.questions.length }</Text>

            <FlatList
                  data={selectedQuiz.questions}
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