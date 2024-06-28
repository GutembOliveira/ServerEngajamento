import { SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import globalStyles from '../utils/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

export default function ConnectScreen() {
  const [quizCode, setQuizCode] = useState('');

  async function connect() {
    if(quizCode == 1){
      await api.get('/conectaQuestionario')
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Input onChangeText={setQuizCode} placeholder="Código" value={quizCode} />

      <Button onPress={connect} text="Conectar" />
    </SafeAreaView>
  )
}