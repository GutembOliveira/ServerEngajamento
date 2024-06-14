import { Dimensions, StyleSheet, View } from "react-native";
import theme from "../theme";

export default function CardContent({ children }) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 25,
    borderRadius: 10,
    borderColor: theme.colors.darkGray,
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.9,
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 5
  }
})