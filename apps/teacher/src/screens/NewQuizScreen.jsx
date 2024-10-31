import { useState } from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import { Button, Icon, Text, TextInput, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { pickDocumentAsync } from '../helpers/pickDocument';
import useQuizzes from '../hooks/useQuizzes';
import globalStyles from '../utils/globalStyles';

export default function NewQuizScreen() {
  const [quizName, setQuizName] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { createNewQuiz } = useQuizzes();
  const theme = useTheme();

  const handleUpload = async () => {
    const result = await pickDocumentAsync();

    if (!result) return;

    setQuizData(result.data);
    setFileName(result.fileName);
  }

  const saveQuiz = async () => {
    if (!quizName || !quizData) {
      Toast.show({
        type: 'error',
        text1: 'Nome e planilha de questões são obrigatórios'
      })
      return;
    }

    const savedQuestions = quizData.map(([subject, topic, question, answer]) => ({
      subject,
      topic,
      question,
      answer: answer === ("Verdadeiro" || "V") ? true : false
    }));

    createNewQuiz({
      name: quizName,
      questions: savedQuestions
    }).then(function (response) {
      Toast.show({
        type: 'success',
        text1: 'Questionário criado com sucesso'
      })

      setQuizName('');
      setQuizData(null);
      setFileName(null);
    })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
      {
        !quizData ? (
          <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: theme.colors.outline, borderStyle: 'dashed'}}>
            <Icon
              source="file-outline"
              size={150}
              color={theme.colors.onSurface}
            />
            <Text variant='titleSmall' style={{ textAlign: 'center' }}>Planilha não lida</Text>
          </View>
        )
          :
          (
            <View style={{ marginBottom: 20, padding: 10, borderWidth: 2, borderColor: theme.colors.primary, borderStyle: 'solid'}}>
              <Icon
                source="file-excel"
                size={150}
                color={theme.colors.primary}
              />
              <Text variant='titleSmall' style={{ textAlign: 'center' }}>{fileName}</Text>
            </View>
          )
      }

      <TextInput 
      label="Nome" 
      placeholder="Nome do questionário" 
      value={quizName}
      onChangeText={setQuizName}
      style={{ width: Dimensions.get('window').width * 0.6, marginVertical: 20 }}/>
  
      <Button mode="contained" style={{ marginVertical: 10 }} onPress={handleUpload}>Ler planilha de questões</Button>
      
      <Button mode="contained" style={{ marginVertical: 10 }} onPress={saveQuiz}>Salvar Questionário</Button>
    </SafeAreaView>
  );
}