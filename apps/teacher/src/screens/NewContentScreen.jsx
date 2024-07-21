import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import NewClassScreen from './NewClassScreen';
import NewQuizScreen from './NewQuizScreen';
import { SafeAreaView } from 'react-native';
import globalStyles from '../utils/globalStyles';

const Tab = createMaterialTopTabNavigator();

export default function NewContentScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Nova turma" component={NewClassScreen} />
      <Tab.Screen name="Novo questionário" component={NewQuizScreen} />
    </Tab.Navigator>
  );
}
