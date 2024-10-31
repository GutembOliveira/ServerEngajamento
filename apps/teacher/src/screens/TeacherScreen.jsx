import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import ListClassesScreen from './ListClassesScreen';
import ListQuizzesScreen from './ListQuizzesScreen';
//import BeginQuizScreen from './BeginQuizScreen';

export default function TeacherScreen() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'questionarios', title: 'Questionários', focusedIcon: 'book', unfocusedIcon: 'book-outline'},
    { key: 'turmas', title: 'Turmas', focusedIcon: 'google-classroom' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    questionarios: ListQuizzesScreen,
    turmas: ListClassesScreen,
  });
  
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
