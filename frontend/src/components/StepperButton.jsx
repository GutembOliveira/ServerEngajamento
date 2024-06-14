import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import theme from '../theme';

export default function StepperButton({ text, onPress, secondary }) {
  return (
      secondary ?
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      :
        <TouchableOpacity style={[styles.button, styles.primary]} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 24,
    marginVertical: 12,
    height: 50,
    width: Dimensions.get('window').width * 0.35,
    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center'
  },
  
  primary:{
    backgroundColor: theme.colors.lightBlue
  },

  secondary: {
    backgroundColor: theme.colors.darkGray
  }
})