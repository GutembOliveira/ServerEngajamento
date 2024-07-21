import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme, ActivityIndicator, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../utils/globalStyles';
import useClasses from '../hooks/useClasses';

export default function ListClassesScreen() {
  const { classes } = useClasses();
  const navigation = useNavigation();

  const theme = useTheme();

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Class Detail', { item: item })} style={{ marginVertical: 15, paddingVertical: 10 }}>
      <Card.Title title="Turma teste"/>
    </Card>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !classes ?
        <ActivityIndicator animating={true} color={theme.colors.primary} />
          :
          (
            classes.length === 0 ?
            <Text variant="titleMedium" theme={{ colors: theme.colors.onBackground }}>Não há turmas cadastradas</Text>
              :
              <>
                <Text variant="titleMedium" theme={{ colors: theme.colors.primary }} style={{ marginVertical: 20 }}>Minhas turmas</Text>
                <Card 
                onPress={() => navigation.navigate('Class Detail', { item: classes })} 
                style={{ marginBottom: 15, paddingVertical: 15, paddingHorizontal: 40 }}>
                  <Text>Turma Teste</Text>
                </Card>
                {/* <FlatList
                  data={classes}
                  keyExtractor={item => item.Turma_idTurma}
                  renderItem={renderItem}
                  style={{width: Dimensions.get('window').width * 0.9}}
                /> */}
              </>
          )
      }
    </SafeAreaView>
  )
}
