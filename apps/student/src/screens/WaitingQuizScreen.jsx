import { SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme, ActivityIndicator, Text, Appbar } from 'react-native-paper';
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

    useEffect(() => {
        if (isSuccess) {
            navigation.navigate('Solve', { quiz: quizToSolve });
        }
    }, [isSuccess, quizToSolve, navigation]);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Aguardar início" />
            </Appbar.Header>

            <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
                {
                    isSuccess ? (
                        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                    ) : (
                        <>
                            <Text variant="titleLarge" style={{ marginBottom: 10 }}>Aguardando autorização</Text>
                            <Text variant="titleMedium">Aguarde o professor iniciar o questionário</Text>
                            <Text variant="titleMedium" style={{ marginBottom: 20 }}>Isso pode levar alguns instantes</Text>

                            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                        </>
                    )
                }
            </SafeAreaView>
        </>
    );
}
