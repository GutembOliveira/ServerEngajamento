import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';

import HomeScreen from './src/screens/HomeScreen';
import TeacherScreen from './src/screens/TeacherScreen';
import ClassDetailScreen from './src/screens/ClassDetailScreen';
import QuizDetailScreen from './src/screens/QuizDetailScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StudentScreen from './src/screens/StudentScreen';
import ConfirmQuizScreen from './src/screens/ConfirmQuizScreen';
import SolveQuizScreen from './src/screens/SolveQuizScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
    <StatusBar style='dark'/>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />

        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Teacher' component={TeacherScreen} />
        <Stack.Screen name='Student' component={StudentScreen} />

        <Stack.Screen name='Class Detail' component={ClassDetailScreen} />
        <Stack.Screen name='Quiz Detail' component={QuizDetailScreen} />

        <Stack.Screen name='Confirm' component={ConfirmQuizScreen} />
        <Stack.Screen name='Solve Quiz' component={SolveQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </RootSiblingParent>
  );
}