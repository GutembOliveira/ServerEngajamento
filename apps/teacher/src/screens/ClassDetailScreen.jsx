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
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{item.idAluno}</Text>
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{item.Nome}</Text>
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{item.email}</Text>
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
              <Text variant="titleLarge" theme={{ colors: theme.colors.onBackground }}>Detalhes da turma</Text>
              <Text variant="titleMedium" theme={{ colors: theme.colors.onBackground }}>Nome: Turma teste </Text>
              <Text variant="titleMedium" theme={{ colors: theme.colors.onBackground }}>Alunos: {selectedClass.length}</Text>

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