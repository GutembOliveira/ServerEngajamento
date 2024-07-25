import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ThemeProvider } from './src/contexts/themeContext';
import { StatusBar } from 'expo-status-bar';

import InitialScreen from './src/screens/InitialScreen';
import ConnectScreen from './src/screens/ConnectScreen';
import SolveQuestionScreen from './src/screens/SolveQuestionScreen';
import WaitingQuizScreen from './src/screens/WaitingQuizScreen';
import FinalResultsScreen from './src/screens/FinalResultsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
        <RootSiblingParent>
          <StatusBar translucent />

          <NavigationContainer>
            <Stack.Navigator initialRouteName='Initial' screenOptions={{
              headerShown: false
            }}>
              {/* <Stack.Screen name='Student' component={StudentScreen} /> */}

              <Stack.Screen name='Initial' component={InitialScreen} />
              <Stack.Screen name='Connect' component={ConnectScreen} />
              <Stack.Screen name='Solve' component={SolveQuestionScreen} />
              <Stack.Screen name='Waiting' component={WaitingQuizScreen} />
              <Stack.Screen name='Final' component={FinalResultsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
    </ThemeProvider>
  );
}