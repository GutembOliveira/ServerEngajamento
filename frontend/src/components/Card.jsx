import { Dimensions, Pressable, StyleSheet } from "react-native";
import theme from '../theme';

export default function Card({ onPress, children }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.darkGray,
    padding: 25,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.8,
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 5
  }
})