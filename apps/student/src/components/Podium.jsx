// components/Podium.js
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import globalStyles from '../utils/globalStyles';

const Podium = ({ students }) => {
  // Ordena alunos por pontuação
  const sortedStudents = students.sort((a, b) => b.pontuacao - a.pontuacao).slice(0, 3);

  const renderPodiumItem = ({ item, index }) => (
    <View style={styles.podiumItem}>
      <Text style={styles.podiumPosition}>{index + 1}º</Text>
      <Text style={globalStyles.text}>{item.nome}</Text>
      <Text style={globalStyles.text}>Pontuação: {item.pontuacao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text variant='titleMedium'>Pódio</Text>
      <FlatList
        style={{ flexGrow: 0 }}
        data={sortedStudents}
        renderItem={renderPodiumItem}
        keyExtractor={(item) => item.matricula.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    marginBottom: 10,
  },
  podiumItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  podiumPosition: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Podium;
