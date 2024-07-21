import { useState } from 'react';
import { SafeAreaView, View, Text, Dimensions } from 'react-native';
import { Button, Icon, TextInput, IconButton, useTheme } from 'react-native-paper';
import { showErrorToast, showSuccessToast } from '../helpers/showToast';
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
      showErrorToast('Nome do questionário e planilha de questões são obrigatórios');
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
      showSuccessToast('Questionário criado com sucesso');

      setQuizName('');
      setQuizData(null);
      setFileName(null);
    })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !quizData ? (
          <>
            <Icon
              source="file-outline"
              size={150}
              style={{ backgroundColor: '#D3D3D3', borderRadius: 10, position: 'absolute' }}
            />
            <Text>Planilha não lida</Text>
          </>
        )
          :
          (
            <>
              <Icon
                source="file-excel"
                size={150}
                style={{ backgroundColor: '#D3D3D3', borderRadius: 10, position: 'absolute' }}
              />
              <Text>{fileName}</Text>
            </>
          )
      }

      <TextInput 
      label="Nome" 
      placeholder="Nome do questionário" 
      value={quizName}
      onChangeText={setQuizName}
      style={{ width: Dimensions.get('window').width * 0.5 }}/>
  
      <Button mode="contained" style={{ marginVertical: 10 }} onPress={handleUpload}>Ler planilha de questões</Button>
      
      <Button mode="contained" style={{ marginVertical: 10 }} onPress={saveQuiz}>Salvar Questionário</Button>
    </SafeAreaView>
  );
}