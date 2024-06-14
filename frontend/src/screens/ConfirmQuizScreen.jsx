import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import globalStyles from '../utils/globalStyles';
import { useEffect, useState } from 'react';
import useQuizzes from '../hooks/useQuizzes';
import theme from '../theme';
import Button from '../components/Button';
import StepperButton from '../components/StepperButton';

export default function ConfirmQuizScreen({ navigation }) {
    const route = useRoute();
    const { id } = route.params;
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const { fetchQuizById } = useQuizzes();
  
    useEffect(() => {
      const getQuiz = async() => {
        const result = await fetchQuizById(id);
        setSelectedQuiz(result);
      }
  
      getQuiz();
    }, []);

    return (
        <SafeAreaView style={globalStyles.container}>
        {
            !selectedQuiz ?
            <ActivityIndicator size="large" color={theme.colors.lightBlue} />
                :
                (
                    <>
                        <Text style={globalStyles.heading}>{selectedQuiz.name}</Text>
                        <Text>{selectedQuiz.questions.length} questões</Text>

                        <View style={styles.buttonArea}>
                            <StepperButton text="Voltar" onPress={() => {navigation.goBack()}} secondary/>
                            <StepperButton text="Responder" onPress={() => {navigation.navigate('Solve Quiz', { quiz: selectedQuiz }) }}/>
                        </View>
                    </>
                )
        }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonArea: {
      //flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginTop: 25
    },
  })