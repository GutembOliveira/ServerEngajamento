import { Dimensions, FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import theme from '../theme';

export default function RadioButtons({ data, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectHandler = (value) => {
    onSelect(value);
    setSelectedOption(value);
  };

  const renderItem = ({ item }) => (
    <Pressable 
      style={[styles.option, item._id === selectedOption ? styles.selected : styles.unselected]}
      onPress={() => selectHandler(item._id)}>
        <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  )
  
  return (
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
  );
}

const styles = StyleSheet.create({ 
  option: {
    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    width: Dimensions.get('window').width * 0.8
  },

  unselected: {
    backgroundColor: theme.colors.lightBlue
  },

  selected: {
    backgroundColor: theme.colors.darkBlue
  },

  text: {
    color: theme.colors.white,
    textAlign: 'center',
  }
});