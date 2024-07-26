import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useTheme, Button, Text, TextInput } from 'react-native-paper';

import globalStyles from '../utils/globalStyles';
import api from '../services/api';

import useStudentStore from "../stores/StudentStore";

export default function InitialScreen({ navigation }) {
  const [numMatricula, setNumMatricula] = useState(null);
  const [loading, setLoading] = useState(false);

  const matricula = useStudentStore((state) => state.matricula);
  const setMatricula = useStudentStore((state) => state.setMatricula);

  const theme = useTheme();

  async function connect() {
    setLoading(true);

    await api.post('/conectarAluno', JSON.stringify({
      numMatricula
    }))
      .then(response => {
        setMatricula(numMatricula);
      }
      ).finally(() => {
        setLoading(false);
      });

    navigation.navigate('Connect')
  }

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall" style={{ marginBottom: 20 }}>Bem-vindo</Text>
      <Text variant="labelLarge" style={{ marginBottom: 40 }}>Para continuar, digite seu número de matrícula</Text>

      <TextInput
        label="Matrícula"
        value={matricula}
        inputMode='numeric'
        onChangeText={setNumMatricula}
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
        onPress={connect}
        loading={loading}>
        Entrar
      </Button>
    </SafeAreaView>
  )
}