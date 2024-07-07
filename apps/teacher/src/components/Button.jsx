import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

import theme from '../theme';

const widths = {
  large: Dimensions.get('window').width * 0.6,
  small: Dimensions.get('window').width * 0.3
}

const colors = {
  primary:{
    background: theme.colors.darkBlue
  },
  secondary: {
    background: theme.colors.darkGray
  }
}

export default function Button({ text, width = 'large', color = 'primary', onPress }) {
  return (
    <TouchableOpacity style={[
      styles.button,
      { width: widths[width] },
      { backgroundColor: colors[color].background }
      ]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.darkBlue,
    marginVertical: 30,
    height: 50,
    width: Dimensions.get('window').width * 0.6,
    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium
  },
})