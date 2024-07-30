import { SafeAreaView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme, ActivityIndicator, Button, Text, Appbar } from 'react-native-paper';
import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function WaitingQuizScreen({ navigation }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [quizToSolve, setQuizToSolve] = useState(null);

    const theme = useTheme();
    
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
            const id = setInterval(askForQuiz, 2000);
            return () => clearInterval(id);
        }

    }, [isSuccess]);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Aguardar início" />
            </Appbar.Header>

            <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
                {
                    isSuccess ?
                    <>
                        <Text variant="headlineSmall" style={{ marginBottom: 20 }}>Quiz Teste</Text>
                        <Text variant="titleMedium" style={{ marginBottom: 10 }}>{quizToSolve.length} questões</Text>

                        <View style={styles.buttonArea}>
                            <Button
                                mode="outlined"
                                onPress={() => { navigation.goBack() }}
                                style={{ width: '35%', marginRight: 30 }}
                            >
                                Voltar
                            </Button>

                            <Button
                                mode="contained"
                                onPress={() => { navigation.navigate('Solve', { quiz: quizToSolve }) }}
                                style={{ width: '35%' }}
                            >
                                Responder
                            </Button>
                        </View>
                    </>
                    :
                        <>
                            <Text variant="titleLarge" style={{ marginBottom: 10 }}>Aguardando autorização</Text>
                            <Text variant="titleMedium">Aguarde o professor iniciar o questionário</Text>
                            <Text variant="titleMedium" style={{ marginBottom: 20 }}>Isso pode levar alguns instantes</Text>

                            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                        </>
                }
            </SafeAreaView>
        </>
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