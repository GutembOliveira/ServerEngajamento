import { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import { ActivityIndicator, Appbar, Card, Text, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import useClasses from '../hooks/useClasses';
import globalStyles from '../utils/globalStyles';

export default function ClassDetailScreen() {
  const route = useRoute();
  //const { id } = route.params;
  const { item } = route.params;
  const [selectedClass, setSelectedClass] = useState(null);
  const { fetchClassById } = useClasses();
  const navigation = useNavigation();

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
    <Card style={{ marginVertical: 12, backgroundColor: theme.colors.secondary }}>
      <Card.Content>
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{item.idAluno}</Text>
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{item.Nome}</Text>
        <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{item.email}</Text>
      </Card.Content>
    </Card>
  )

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
        {
          !selectedClass ?
            <ActivityIndicator animating={true} color={theme.colors.primary} />
            :
            (
              <View style={{ position: 'relative', top: 100 }}>
                <Text variant="titleLarge" style={{ textAlign: 'center' }}>Detalhes da turma</Text>
                <Text variant="titleMedium" style={{ textAlign: 'center' }}>Nome: Turma teste </Text>
                <Text variant="titleMedium" style={{ textAlign: 'center' }}>Alunos: {selectedClass.length}</Text>

                <FlatList
                  data={selectedClass}
                  keyExtractor={item => item.idAluno}
                  renderItem={renderItem}
                  style={{ width: Dimensions.get('window').width * 0.9, maxHeight: '80%' }}
                />
              </View>
            )
        }
      </SafeAreaView>
    </>
  )
}