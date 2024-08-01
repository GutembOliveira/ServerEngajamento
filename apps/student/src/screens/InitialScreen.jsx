import { SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useTheme, Button, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function InitialScreen({ navigation }) {
  const [numMatricula, setNumMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const storeMatricula = async (value) => {
    try {
      await AsyncStorage.setItem('matricula', value);
    } catch (e) {
      console.error(e);
    }
  };

  async function connect() {
    if (numMatricula === '') {
      Toast.show({
        type: 'error',
        text1: 'Informe um número de matrícula'
      });

      return;
    }

    setLoading(true);

    await api.post('/conectarAluno', JSON.stringify({
      matricula: Number(numMatricula)
    }))
      .then(response => {
        storeMatricula(numMatricula);
      })
      .finally(() => {
        setLoading(false);
      });

    navigation.navigate('Waiting');
  }

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall" style={{ marginBottom: 20 }}>Bem-vindo</Text>
      <Text variant="labelLarge" style={{ marginBottom: 40 }}>Para continuar, digite seu número de matrícula</Text>

      <TextInput
        label="Matrícula"
        value={numMatricula}
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
  );
}

const styles = StyleSheet.create({});
