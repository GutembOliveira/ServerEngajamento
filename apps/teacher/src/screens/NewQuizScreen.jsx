import { SafeAreaView, Text } from 'react-native';
import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../helpers/showToast';

import { pickDocumentAsync } from '../helpers/pickDocument';

import useQuizzes from '../hooks/useQuizzes';

import globalStyles from '../utils/globalStyles';
import Button from '../components/Button';
import Input from '../components/Input';
import theme from '../theme';

export default function NewQuizScreen() {
  const [quizName, setQuizName] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { createNewQuiz } = useQuizzes();

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
      answer : answer === ("Verdadeiro" || "V") ? true : false
    }))

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
      <Input onChangeText={setQuizName} value={quizName} placeholder="Nome do questionário" />
      <Text style={globalStyles.text}>{!fileName ? 'Planilha não lida' : fileName}</Text>
      <Button text="Ler planilha de questões" onPress={handleUpload} />
      <Button text="Salvar Questionário" onPress={saveQuiz} />
    </SafeAreaView>
  )
}