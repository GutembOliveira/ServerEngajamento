import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme, ActivityIndicator, Button, Text } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import globalStyles from "../utils/globalStyles";
import useQuizStore from '../stores/QuizStore';
import { useEffect, useState } from 'react';
import Podium from '../components/Podium';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FinalResultsScreen() {
    const [matricula, setMatricula] = useState(null);
    const [hasMatricula, setHasMatricula] = useState(false);
    const [podiumReceived, setPodiumReceived] = useState(false);
    const [students, setStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    const route = useRoute();
    const { quiz } = route.params;
    const navigation = useNavigation();
    const correctAnswers = useQuizStore((state) => state.correctAnswers);
    const theme = useTheme();

    useEffect(() => {
        const getMatricula = async () => {
            try {
                const value = await AsyncStorage.getItem('matricula');
                if (value !== null) {
                    setMatricula(value);
                    setHasMatricula(true);
                }
            } catch (e) {
                console.error(e);
            }
        };

        getMatricula();
    }, []);

    useEffect(() => {
        if (!hasMatricula) return;

        async function finishQuiz() {
            try {
                await api.post('/conectarAluno', JSON.stringify({
                    matricula: Number(matricula)
                }));
                
                await api.post('/salvaPontuacao', JSON.stringify({
                    matricula: Number(matricula),
                    pontuacao: correctAnswers
                }));
                
                const id = setInterval(async () => {
                    try {
                        const response = await api.get('/retornaPodio');
                        setStudents(response.data);
                        setPodiumReceived(true);
                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                }, 2000);

                setIntervalId(id);
            } catch (error) {
                console.error('Error making API call:', error);
            }
        }

        finishQuiz();
    }, [hasMatricula]);

    const handleEnd = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        navigation.popToTop();
    };

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant='headlineSmall'>Questionário finalizado</Text>
            <Text variant='titleLarge' style={{ marginVertical: 30 }}>Você acertou {correctAnswers} de {quiz.length} questões</Text>

            {
                podiumReceived ? (
                    <Podium students={students} />
                ) : (
                    <ActivityIndicator animating={true} size="large" color={theme.colors.primary} style={{ marginVertical: 20 }}/>
                )

            }

            <Button
                mode="contained"
                style={{ padding: 10 }}
                onPress={handleEnd}>
                Encerrar
            </Button>
        </SafeAreaView>
    );
}