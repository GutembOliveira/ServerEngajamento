import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

import globalStyles from '../utils/globalStyles';
import api from '../services/api';

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
          <Text variant="titleMedium">Nenhum aluno conectado</Text>
          :
          connectedStudents === 1 ?
            <Text variant="titleMedium">1 aluno conectado</Text>
            :
            <Text variant="titleMedium">{connectedStudents} alunos conectados</Text>
      }
      <TextInput lable="Código" placeholder="Digite código aqui" onChangeText={setQuizCode} value={quizCode} />
      {/* <Button onPress={liberarQuestionario} text="Iniciar questionário" /> */}
      <Button onPress={liberarQuestionario}>
        Iniciar questionário
      </Button>

    </SafeAreaView>
  );
}