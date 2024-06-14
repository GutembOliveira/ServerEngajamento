import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import globalStyles from '../utils/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ConnectScreen() {
  const [quizCode, setQuizCode] = useState('');

  function connect() {

  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Input onChangeText={setQuizCode} placeholder="Código" value={quizCode} />

      <Button onPress={connect} text="Conectar" />
    </SafeAreaView>
  )
}