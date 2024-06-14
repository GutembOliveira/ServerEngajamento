import { ActivityIndicator, Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import theme from '../theme';
import globalStyles from '../utils/globalStyles';
import useClasses from '../hooks/useClasses';
import Card from '../components/Card';

export default function ListClassesScreen({ navigation }) {
  const { classes } = useClasses();

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Class Detail', { id: item._id})}>
      <Text>{item.name}</Text>
    </Card>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !classes ?
          <ActivityIndicator size="large" color={theme.colors.lightBlue} />
          :
          (
            classes.length === 0 ?
              <Text style={globalStyles.text}>Não há turmas cadastradas</Text>
              :
              <>
                <Text style={[globalStyles.text, globalStyles.heading]}>Minhas turmas</Text>
                <FlatList
                  data={classes}
                  keyExtractor={item => item._id}
                  renderItem={renderItem}
                  style={{width: Dimensions.get('window').width * 0.9}}
                />
              </>
          )
      }
    </SafeAreaView>
  )
}
