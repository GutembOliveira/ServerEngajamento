import ConnectScreen from './ConnectScreen';
import SelectQuizScreen from './SelectQuizScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function StudentScreen() {
  return (
      <Tab.Navigator screenOptions={{
        tabBarStyle:{
          height: 65
        },
        tabBarLabelStyle: {
          paddingBottom: 10
        }
      }}>
        <Tab.Screen
         name="Conectar"
         component={ConnectScreen}
         options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="qrcode" color={color} size={size}/>
          )
         }}/>
        <Tab.Screen
         name="Resolver"
         component={SelectQuizScreen}
         options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="question-answer" color={color} size={size}/>
          )
         }}/>
      </Tab.Navigator>
  );
}
