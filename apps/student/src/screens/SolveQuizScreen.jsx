import { NavigationContainer, useRoute, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState, useCallback } from "react";
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import theme from "../theme";
//import Button from "../components/Button";
import useQuizStore from "../stores/QuizStore";
import { useTheme, ActivityIndicator, Button, Text } from "react-native-paper";

const QuestionScreen = ({ navigation }) => {
    const quiz = useQuizStore((state) => state.quiz);

    const [timer, setTimer] = useState(5);
    const [timeIsOver, setTimeIsOver] = useState(false);

    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const setSelectedAnswer = useQuizStore((state) => state.setSelectedAnswer);
    const computeAnswer = useQuizStore((state) => state.computeAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);

    const theme = useTheme();

    useFocusEffect(
        useCallback(() => {
            setTimer(5);
            setTimeIsOver(false);
            setSelectedAnswer(null);
        }, [])
    );

    useEffect(() => {
        let interval = null;

        if (!timeIsOver && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setTimeIsOver(true);
        }

        return () => clearInterval(interval);
    }, [timer, timeIsOver, currentQuestionIndex]);


    const answerNextQuestion = () => {
        computeAnswer(lastAnswer, quiz[currentQuestionIndex].alternativas[0].resposta)
        nextQuestion();
        setTimer(5);
        setTimeIsOver(false);
        setSelectedAnswer(null);
    }

    const finishQuiz = () => {
        computeAnswer(lastAnswer, quiz[currentQuestionIndex].alternativas[0].resposta);
        navigation.navigate('Final', { quiz: quiz });
    }

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            {
                !quiz ?
                    <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                    :
                    (
                        <>
                            <Text variant="headlineMedium" style={{ marginBottom: 20 }}>Quiz Teste</Text>
                            {
                                timeIsOver ?
                                    <Text variant="titleMedium" style={{ marginBottom: 30 }}>Tempo esgotado</Text>
                                    :
                                    <Text variant="titleMedium" style={{ marginBottom: 30 }}>Tempo:  {timer}</Text>
                            }

                            <Text variant="titleMedium">Questão {currentQuestionIndex + 1} de {quiz.length}</Text>
                            <Text variant="titleMedium" style={{ marginBottom: 30 }}>{quiz[currentQuestionIndex].alternativas[0].descricao}</Text>

                            <View style={styles.buttonContainer}>
                                <Button
                                mode="contained"
                                onPress={() => setSelectedAnswer(true)}
                                style={[styles.button, styles.true, lastAnswer === true && styles.selectedButton]}
                                disabled={timeIsOver}
                                >
                                    Verdadeiro
                                </Button>

                                <Button
                                mode="contained"
                                onPress={() => setSelectedAnswer(false)}
                                style={[styles.button, styles.false, lastAnswer === false && styles.selectedButton]}
                                disabled={timeIsOver}
                                >
                                    Falso
                                </Button>
                            </View>

                            {
                                (timeIsOver && lastAnswer === null) && (
                                    <Text variant="titleMedium">
                                        Você não respondeu a questão
                                    </Text>
                                )
                            }

                            {lastAnswer !== null && (
                                <Text variant="titleMedium">
                                    Você selecionou: {lastAnswer ? "Verdadeiro" : "Falso"}
                                </Text>
                            )}

                            {
                                timeIsOver &&
                                (
                                    currentQuestionIndex === quiz.length - 1 ?
                                        <Button mode="contained" onPress={finishQuiz} style={{ marginTop: 30}}>
                                            Finalizar
                                        </Button>
                                        :
                                        <Button mode="contained" onPress={answerNextQuestion} style={{ marginTop: 30}}>
                                            Próxima Questão
                                        </Button>
                                )
                            }

                        </>
                    )
            }
        </SafeAreaView>
    );
};

const FinalScreen = ({ navigation }) => {
    const route = useRoute();
    const { quiz } = route.params;
    const correctAnswers = useQuizStore((state) => state.correctAnswers);

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant="titleMedium">Questionário finalizado</Text>
            <Text variant="titleMedium">Total de questões: {quiz.length}</Text>
            <Text variant="titleMedium">Respostas corretas: {correctAnswers}</Text>
        </SafeAreaView>
    );
}

const Stack = createNativeStackNavigator();

export default function SolveQuizScreen() {
    const route = useRoute();
    const { quiz } = route.params;

    const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
    const resetQuiz = useQuizStore((state) => state.reset);

    useEffect(() => {
        resetQuiz();
        fetchQuiz(quiz);
    }, []);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="QuestionScreen" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Question" component={QuestionScreen} options={{ title: 'Questão' }} />
                <Stack.Screen name="Final" component={FinalScreen} options={{ title: 'Final' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8,
        marginBottom: 20,
    },

    button: {
        padding: 10,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.375,
        marginVertical: 20,
        opacity: .5
    },

    true: {
        backgroundColor: '#1E90FF'
    },

    false: {
        backgroundColor: '#FF4500'
    },

    selectedButton: {
        opacity: 1
    }
})
