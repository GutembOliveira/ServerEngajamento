import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/contexts/themeContext';
import Toast from 'react-native-toast-message';

import TeacherScreen from './src/screens/TeacherScreen';
import NewClassScreen from './src/screens/NewClassScreen';
import NewQuizScreen from './src/screens/NewQuizScreen';
import ClassDetailScreen from './src/screens/ClassDetailScreen';
import QuizDetailScreen from './src/screens/QuizDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar translucent />

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Teacher' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Teacher' component={TeacherScreen} />
          <Stack.Screen name='New Class' component={NewClassScreen} />
          <Stack.Screen name='New Quiz' component={NewQuizScreen} />
          <Stack.Screen name='Class Detail' component={ClassDetailScreen} />
          <Stack.Screen name='Quiz Detail' component={QuizDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </ThemeProvider>
  );
}