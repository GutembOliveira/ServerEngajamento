import { SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme, Appbar, Button, Text, TextInput } from 'react-native-paper';

import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function ConnectScreen({ navigation }) {
  const [quizCode, setQuizCode] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  async function connect() {
    navigation.navigate('Waiting')
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Conectar" />
      </Appbar.Header>
    
    <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall" style={{ marginBottom: 20 }}>Conectar</Text>
      <Text variant="labelLarge" style={{ marginBottom: 40 }}>Digite o código informado pelo professor</Text>

      <TextInput
        label="Código"
        value={quizCode}
        inputMode='numeric'
        onChangeText={setQuizCode}
        mode="outlined"
        placeholder='Digite o código'
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
    </>
  )
}