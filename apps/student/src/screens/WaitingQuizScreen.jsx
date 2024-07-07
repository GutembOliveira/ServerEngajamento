import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import globalStyles from '../utils/globalStyles';
import api from '../services/api';
import theme from '../theme';
import StepperButton from '../components/StepperButton';

export default function WaitingQuizScreen({ navigation }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [quizToSolve, setQuizToSolve] = useState(null);

    useEffect(() => {
        const askForQuiz = async () => {
            try {
                const response = await api.get('/questionarioAluno');

                if (response.data !== 'questionario não liberado') {
                    setQuizToSolve(response.data);
                    setIsSuccess(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!isSuccess) {
            const id = setInterval(askForQuiz, 1000);
            return () => clearInterval(id);
        }

    }, [isSuccess]);

    return (
        <SafeAreaView style={globalStyles.container}>
            {
                isSuccess ?
                    <>
                        <Text style={globalStyles.heading}>Quiz Teste</Text>
                        <Text>{quizToSolve.length} questões</Text>

                        <View style={styles.buttonArea}>
                            <StepperButton text="Voltar" onPress={() => { navigation.goBack() }} secondary />
                            <StepperButton text="Responder" onPress={() => { navigation.navigate('Solve Quiz', { quiz: quizToSolve }) }} />
                        </View>
                    </>
                    :
                    <>
                        <Text>Aguardando autorização</Text>
                        <Text>Aguarde o professor iniciar o questionário. Isto pode levar alguns instantes</Text>

                        <ActivityIndicator size="large" color={theme.colors.lightBlue} />
                    </>
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