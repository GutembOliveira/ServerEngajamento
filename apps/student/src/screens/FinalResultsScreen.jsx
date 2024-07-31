import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';
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
    const [resultsSent, setResultsSent] = useState(false);
    const [students, setStudents] = useState([]);

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
                const response1 = await api.post('/conectarAluno', JSON.stringify({
                    matricula: Number(matricula)
                }));
                
                const response2 = await api.post('/salvaPontuacao', JSON.stringify({
                    matricula: Number(matricula),
                    pontuacao: correctAnswers
                }));
                
                setResultsSent(true);
                
                const response3 = await api.get('/retornaPodio');
                setStudents(response3.data);
            } catch (error) {
                console.error('Error making API call:', error);
            }
        }

        finishQuiz();
    }, [hasMatricula]);

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant='headlineSmall'>Questionário finalizado</Text>
            <Text variant='titleLarge' style={{ marginVertical: 30 }}>Você acertou {correctAnswers} de {quiz.length} questões</Text>

            <Podium students={students} />

            <Button
                mode="contained"
                style={{ padding: 10 }}
                onPress={() => navigation.popToTop()}>
                Encerrar
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    podiumItem: {
        alignItems: 'center',
        marginVertical: 10
    },
    podiumPosition: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
