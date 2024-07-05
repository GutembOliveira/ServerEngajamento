import { SafeAreaView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import globalStyles from '../utils/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

export default function ConnectScreen({ navigation }) {
  const [quizCode, setQuizCode] = useState('');

  async function connect() {
    if (quizCode == 123) {
      await api.get('/conectarAluno')
      .then(response => console.log(response.data));

      navigation.navigate('Waiting')
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Input onChangeText={setQuizCode} placeholder="Código" value={quizCode} />
      <Button onPress={connect} text="Conectar" />
    </SafeAreaView>
  )
}