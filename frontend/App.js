import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';

import HomeScreen from './src/screens/HomeScreen';
import TeacherScreen from './src/screens/TeacherScreen';
import ClassDetailScreen from './src/screens/ClassDetailScreen';
import QuizDetailScreen from './src/screens/QuizDetailScreen';
import StudentScreen from './src/screens/StudentScreen';
import ConfirmQuizScreen from './src/screens/ConfirmQuizScreen';
import SolveQuizScreen from './src/screens/SolveQuizScreen';
import WaitingQuizScreen from './src/screens/WaitingQuizScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
    <StatusBar style='dark'/>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Teacher' component={TeacherScreen} />
        <Stack.Screen name='Student' component={StudentScreen} />

        <Stack.Screen name='Class Detail' component={ClassDetailScreen} />
        <Stack.Screen name='Quiz Detail' component={QuizDetailScreen} />

        <Stack.Screen name='Confirm' component={ConfirmQuizScreen} />
        <Stack.Screen name='Solve Quiz' component={SolveQuizScreen} />
        <Stack.Screen name='Waiting' component={WaitingQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </RootSiblingParent>
  );
}