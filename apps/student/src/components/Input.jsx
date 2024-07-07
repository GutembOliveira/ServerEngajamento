import { useState } from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";
import theme from '../theme';

export default function Input({ onChangeText, value, placeholder, secureTextEntry}) {
  const [focus, setFocus] = useState(false);

  return (
    <TextInput 
    onChangeText={onChangeText} 
    value={value} 
    placeholder={placeholder} 
    secureTextEntry={secureTextEntry}
    style={[styles.input, focus && styles.focus]} 
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 17.5,
    borderWidth: 1,
    padding: 12,
    width: Dimensions.get('window').width * 0.6,
    borderRadius: 10
  },

  focus: { 
    borderColor: theme.colors.lightBlue,
    borderWidth: 2
  }
})