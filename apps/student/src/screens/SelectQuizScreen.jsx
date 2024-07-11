import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Text, View } from "react-native";
import globalStyles from '../utils/globalStyles';
import useQuizzes from "../hooks/useQuizzes";
import theme from "../theme";
import Card from "../components/Card";
import Podium from "../components/Podium"; // CHANGED
import { useState } from 'react'; // CHANGED

export default function SelectQuizScreen({ navigation }) {
  const { quizzes } = useQuizzes();
  const [students, setStudents] = useState([]); // CHANGED
  const [questionIndex, setQuestionIndex] = useState(0); // CHANGED

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Confirm', { item: item })}>
      <Text>Quiz Teste</Text>
    </Card>
  );

  const handleAnswerSubmit = (studentId, correct) => { // CHANGED
    setStudents(prevStudents => { // CHANGED
      return prevStudents.map(student => { // CHANGED
        if (student.id === studentId) { // CHANGED
          return { ...student, acertos: student.acertos + (correct ? 1 : 0) }; // CHANGED
        } // CHANGED
        return student; // CHANGED
      }); // CHANGED
    }); // CHANGED
    setQuestionIndex(prevIndex => prevIndex + 1); // CHANGED
  }; // CHANGED

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
                <Podium students={students} /> {/* CHANGED */}
              </>
          )
      }
    </SafeAreaView>
  );
}
