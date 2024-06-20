import { SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import globalStyles from '../utils/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

export default function ConnectScreen() {
  const [quizCode, setQuizCode] = useState('');
  const [data, setData] = useState(null);

  async function connect() {
    const response = await api.get("/Questionarios")
    setData(response.data)
  }

  useEffect(() => {
    console.log(data);
  }, [data]);


  return (
    <SafeAreaView style={globalStyles.container}>
      <Input onChangeText={setQuizCode} placeholder="Código" value={quizCode} />

      <Button onPress={connect} text="Conectar" />
    </SafeAreaView>
  )
}