import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useTheme, Button, TextInput } from 'react-native-paper';

import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function ConnectScreen({ navigation }) {
  const [quizCode, setQuizCode] = useState('');

  const theme = useTheme();

  async function connect() {
    if (quizCode == 123) {
      await api.get('/conectarAluno')
        .then(response => console.log(response.data));

      navigation.navigate('Waiting')
    }
  }

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        label="Código"
        value={quizCode}
        onChangeText={setQuizCode}
        mode="outlined"
        placeholder='Digite o código aqui'
        activeOutlineColor={theme.colors.onBackground}
        style={{
          width: '75%',
          marginBottom: 40
        }}
        outlineStyle={{
          borderRadius: 10
        }}
      />

      <Button
        icon="qrcode"
        mode="contained"
        style={{ padding: 5 }}
        onPress={connect}>
        Conectar
      </Button>
    </SafeAreaView>
  )
}