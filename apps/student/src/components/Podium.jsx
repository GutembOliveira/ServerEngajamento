import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

const Podium = ({ students }) => {
  // Ordena alunos por pontuação
  const sortedStudents = students.sort((a, b) => b.pontuacao - a.pontuacao).slice(0, 3);

  const renderPodiumItem = ({ item, index }) => (
    <View style={styles.podiumItem}>
      <Text variant='titleSmall' style={{ marginTop: 10 }}>{index + 1}º</Text>
      <Text variant='titleSmall' style={{ marginVertical: 10}}>{item.nome}</Text>
      <Text variant='titleSmall'>Pontuação: {item.pontuacao}</Text>
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
  podiumItem: {
    alignItems: 'center',
    marginVertical: 10,
  }
});

export default Podium;
