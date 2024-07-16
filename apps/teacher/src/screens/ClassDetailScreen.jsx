import { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView } from 'react-native';
import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';

import { useRoute } from '@react-navigation/native';
import useClasses from '../hooks/useClasses';
import globalStyles from '../utils/globalStyles';

export default function ClassDetailScreen() {
  const route = useRoute();
  //const { id } = route.params;
  const { item } = route.params;
  const [selectedClass, setSelectedClass] = useState(null);
  const { fetchClassById } = useClasses();

  const theme = useTheme()

  useEffect(() => {
    // const getClass = async() => {
    //   const result = await fetchClassById(id);
    //   setSelectedClass(result);
    // }
    // getClass();
    setSelectedClass(item);
  }, []);

  const renderItem = ({ item }) => (
    <Card>
      <Card.Content>
        <Text variant="titleSmall">{item.idAluno}</Text>
        <Text variant="titleSmall">{item.Nome}</Text>
        <Text variant="titleSmall">{item.email}</Text>
      </Card.Content>
    </Card>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !selectedClass ?
          <ActivityIndicator animating={true} color={theme.colors.primary} />
          :
          (
            <>
              <Text variant="titleLarge">Detalhes da turma</Text>
              <Text variant="titleMedium">Nome: Turma teste </Text>
              <Text variant="titleMedium">Alunos: {selectedClass.length}</Text>

              <FlatList
                data={selectedClass}
                keyExtractor={item => item.idAluno}
                renderItem={renderItem}
                style={{ width: Dimensions.get('window').width * 0.9 }}
              />
            </>
          )
      }
    </SafeAreaView>
  )
}