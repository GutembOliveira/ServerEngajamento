import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useTheme, Button, TextInput } from 'react-native-paper';

import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function InitialScreen({ navigation }) {
  const [matricula, setMatricula] = useState('');

  const theme = useTheme();

  async function connect() {
      await api.post('/conectarAluno', JSON.stringify({
        matricula
      }))
        .then(response => console.log(response.data));

      navigation.navigate('Connect')
  }
  
  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        label="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
        mode="outlined"
        placeholder='Digite seu número de matrícula'
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
        icon="login"
        mode="contained"
        style={{ padding: 5 }}
        onPress={connect}>
        Entrar
      </Button>
    </SafeAreaView>
  )
}