import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome5'
//import Card from '../components/Card';
import globalStyles from '../utils/globalStyles';
import theme from '../theme';

import { Button } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Button
      onPress={() => navigation.navigate('Teacher')}
      size="lg"
      radius={"lg"}
      color={theme.colors.darkGray}
      icon={{ name: 'chalkboard-teacher', type: 'font-awesome-5', size: 15}}
      containerStyle={{
        width: Dimensions.get('window').width * 0.75,
        elevation: 3,
        marginVertical: 20,
      }}
      iconContainerStyle={{ marginRight: 30}}
      buttonStyle={{ padding: 20}}
      titleStyle={{ color: 'black'}}>
        Sou professor
      </Button>

      <Button
      onPress={() => navigation.navigate('Student')}
      size="lg"
      radius={"lg"}
      color={theme.colors.darkGray}
      icon={{ name: 'book', type: 'font-awesome-5', size: 15}}
      containerStyle={{
        width: Dimensions.get('window').width * 0.75,
        elevation: 3,
        marginVertical: 20,
      }}
      iconContainerStyle={{ marginRight: 30}}
      buttonStyle={{ padding: 20}}
      titleStyle={{ color: 'black'}}>
        Sou aluno
      </Button>

      {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Teacher')}>
        <View style={styles.cardContent}>
            <Icon name='chalkboard-teacher'/>
            <Text>Sou professor</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Student')}>
        <View style={styles.cardContent}>
          <Icon name='book'/>
          <Text>Sou aluno</Text>
        </View>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.75,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: theme.colors.darkGray,
    marginVertical: 20
  },
  
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '75%',
    padding: 20
  }
})