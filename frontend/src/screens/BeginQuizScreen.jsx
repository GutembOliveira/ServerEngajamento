import { SafeAreaView, Text } from 'react-native';

import globalStyles from '../utils/globalStyles';
import Button from '../components/Button';

import api from '../services/api';
import { useEffect, useState } from 'react';
import Input from '../components/Input';

export default function BeginQuizScreen() {
  const [quizCode, setQuizCode] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [connectedStudents, setConnectedStudents] = useState(null);

  useEffect(() => {
    const getConnectedStudents = async () => {
      await api.get('/alunosConectados')
        .then(response => {
          setConnectedStudents(response.data);
        })
        .catch(error => {
          console.error(error)
        })
    }

    const id = setInterval(getConnectedStudents, 2000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  const liberarQuestionario = async () => {
    await api.post('/conectaQuestionario', JSON.stringify({ valor: true }))
      .then((response) => { console.log(response.data) })
      .catch((error) => { console.error(error) })
  }

  const iniciarQuestionario = async () => {
    const result = await api.get('/iniciaQuestionario');
    console.log(result)
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        connectedStudents === 0 ?
          <Text>Nenhum aluno conectado</Text>
          :
          connectedStudents === 1 ?
            <Text>1 aluno conectado</Text>
            :
            <Text>{connectedStudents} alunos conectados</Text>
      }
      <Input onChangeText={setQuizCode} placeholder="Código" value={quizCode} />
      <Button onPress={liberarQuestionario} text="Iniciar questionário" />
    </SafeAreaView>
  );
}