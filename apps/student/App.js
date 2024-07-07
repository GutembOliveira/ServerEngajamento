import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';

import ConnectScreen from './src/screens/ConnectScreen';
import ConfirmQuizScreen from './src/screens/ConfirmQuizScreen';
import SolveQuizScreen from './src/screens/SolveQuizScreen';
import WaitingQuizScreen from './src/screens/WaitingQuizScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
    <StatusBar translucent/>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Connect' screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name='Student' component={StudentScreen} /> */}

        <Stack.Screen name='Connect' component={ConnectScreen} />
        <Stack.Screen name='Confirm' component={ConfirmQuizScreen} />
        <Stack.Screen name='Solve Quiz' component={SolveQuizScreen} />
        <Stack.Screen name='Waiting' component={WaitingQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </RootSiblingParent>
  );
}