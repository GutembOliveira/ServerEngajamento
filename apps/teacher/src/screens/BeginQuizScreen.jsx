import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';

import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function BeginQuizScreen() {
  const [quizCode, setQuizCode] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [connectedStudents, setConnectedStudents] = useState(null);

  const theme = useTheme()

  useEffect(() => {
    const loadClass = async () => {
      await api.get('/carregaTurma')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error)
        })
    }

    loadClass();
  }, [])

  useEffect(() => {
    const getConnectedStudents = async () => {
      await api.get('/alunosConectados')
        .then(response => {
          console.log(response.data)
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

  // const iniciarQuestionario = async () => {
  //   const result = await api.get('/iniciaQuestionario');
  //   console.log(result)
  // }

  const liberarProximaQuestao = async () => {
    const result = await api.get('/liberaProximaQuestao');
    console.log(result)
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <TextInput 
      label="Código" 
      placeholder="Digite código aqui"
      inputMode='numeric'
      onChangeText={setQuizCode} value={quizCode}
      style={{ width: Dimensions.get('window').width * 0.5 }}/>
  
      {/* <Button onPress={liberarQuestionario} text="Iniciar questionário" /> */}
      <Button mode="contained" onPress={liberarQuestionario} style={{ marginTop: 20 }}>
        Iniciar questionário
      </Button>

      <Button mode="contained" onPress={liberarProximaQuestao} style={{ marginTop: 20 }}>
        Próxima questão
      </Button>

    </SafeAreaView>
  );
}