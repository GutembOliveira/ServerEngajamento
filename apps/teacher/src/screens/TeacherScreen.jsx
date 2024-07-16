import ListClassesScreen from './ListClassesScreen';
import ListQuizzesScreen from './ListQuizzesScreen';
import NewContentScreen from './NewContentScreen';
import ApplyQuizScreen from './ApplyQuizScreen';
import BeginQuizScreen from './BeginQuizScreen';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { BottomNavigation } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function TeacherScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
         safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Questionários"
        component={ListQuizzesScreen}
        options={{
          tabBarLabel: 'Questionários',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="book" color={color} size={size} />
          ),
          headerBackTitle: 'Voltar'
        }} />
      <Tab.Screen
        name="Turmas"
        component={ListClassesScreen}
        options={{
          tabBarLabel: 'Turmas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="google-classroom" color={color} size={size} />
          ),
          headerBackTitle: 'Voltar'
        }} />
      <Tab.Screen
        name="Novo"
        component={NewContentScreen}
        options={{
          tabBarLabel: 'Novo',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="plus-circle" color={color} size={size} />
          ),
          headerBackTitle: 'Voltar'
        }} />
      <Tab.Screen
        name="Aplicar questionário"
        component={BeginQuizScreen}
        options={{
          tabBarLabel: 'Aplicar Questionário',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="check-square" color={color} size={size} />
          ),
          headerBackTitle: 'Voltar'
        }} />
    </Tab.Navigator>
  );
}
