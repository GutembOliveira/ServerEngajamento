// screens/PodiumScreen.js
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import globalStyles from '../utils/globalStyles';
import theme from '../theme';
import Podium from '../components/Podium';
import api from '../services/api';

export default function PodiumScreen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students'); // Ajuste a URL conforme necessário
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={[globalStyles.text, globalStyles.heading]}>Pódio dos Alunos</Text>
      {
        loading ?
          <ActivityIndicator size="large" color={theme.colors.lightBlue} />
          :
          <Podium students={students} />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
