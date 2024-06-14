import { StyleSheet } from 'react-native';
import theme from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: theme.colors.black
  },

  heading: {
    marginVertical: 40,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.large
  },

  subheading:{
    marginVertical: 25,
    fontSize: theme.fontSizes.medium
  },

  link: {
    color: theme.colors.lightBlue,
    textDecorationLine: 'underline'
}
});