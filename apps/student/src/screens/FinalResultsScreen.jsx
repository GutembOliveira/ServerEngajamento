import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import globalStyles from "../utils/globalStyles";
import useQuizStore from '../stores/QuizStore';
import useStudentStore from '../stores/QuizStore';
import { useEffect } from 'react';
import Podium from '../components/Podium';
import api from '../services/api';

export default function FinalResultsScreen() {
    const route = useRoute();
    const { quiz } = route.params;
    const navigation = useNavigation();
    const correctAnswers = useQuizStore((state) => state.correctAnswers);
    const matricula = useStudentStore((state) => state.matricula);

    const theme = useTheme();

    const students = [
        { id: 1, name: 'Aluno 1', acertos: 5 },
        { id: 2, name: 'Aluno 2', acertos: 7 },
        { id: 3, name: 'Aluno 3', acertos: 9 },
        { id: 4, name: 'Aluno 4', acertos: 6 },
    ]

    useEffect(() => {
        async function sendResults(){
            await api.post('/salvaPontuacao', JSON.stringify({
                matricula,
                pontuacao: correctAnswers
            }))
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            })
        }

        sendResults()
    }, []);

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
    )
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