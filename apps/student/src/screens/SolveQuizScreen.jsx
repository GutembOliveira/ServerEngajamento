import { NavigationContainer, useRoute, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import theme from "../theme";
import Button from "../components/Button";
import useQuizStore from "../stores/QuizStore";

const QuestionScreen = ({ navigation }) => {
    const quiz = useQuizStore((state) => state.quiz);

    const [timer, setTimer] = useState(5);
    const [timeIsOver, setTimeIsOver] = useState(false);

    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const setSelectedAnswer = useQuizStore((state) => state.setSelectedAnswer);
    const computeAnswer = useQuizStore((state) => state.computeAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);

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
        <SafeAreaView style={globalStyles.container}>
            {
                !quiz ?
                    <ActivityIndicator size="large" color={theme.colors.lightBlue} />
                    :
                    (
                        <>
                            <Text style={globalStyles.heading}>Quiz Teste</Text>
                            {
                                timeIsOver ?
                                    <Text style={globalStyles.subheading}>Tempo esgotado</Text>
                                    :
                                    <Text style={globalStyles.subheading}>Tempo:  {timer}</Text>
                            }

                            <Text style={globalStyles.subheading}>Questão {currentQuestionIndex + 1} de {quiz.length}</Text>
                            {/* <Text style={globalStyles.subheading}>Assunto: {quiz.alternativas[currentQuestionIndex].topic}</Text> */}
                            <Text style={styles.question}>{quiz[currentQuestionIndex].alternativas[0].descricao}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.true, lastAnswer === true && styles.selectedButton]}
                                    onPress={() => setSelectedAnswer(true)}
                                    disabled={timeIsOver}
                                >
                                    <Text style={styles.buttonText}>Verdadeiro</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.false, lastAnswer === false && styles.selectedButton]}
                                    onPress={() => setSelectedAnswer(false)}
                                    disabled={timeIsOver}
                                >
                                    <Text style={styles.buttonText}>Falso</Text>
                                </TouchableOpacity>
                            </View>

                            {
                                (timeIsOver && lastAnswer === null) && (
                                    <Text style={styles.answerText}>
                                        Você não respondeu a questão
                                    </Text>
                                )
                            }

                            {lastAnswer !== null && (
                                <Text style={styles.answerText}>
                                    Você selecionou: {lastAnswer ? "Verdadeiro" : "Falso"}
                                </Text>
                            )}

                            {
                                timeIsOver &&
                                (
                                    currentQuestionIndex === quiz.length - 1 ?
                                        <Button text="Finalizar" onPress={finishQuiz} />
                                        :
                                        <Button text="Próxima Questão" onPress={answerNextQuestion} />
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
        <SafeAreaView style={globalStyles.container}>
            <Text>Questionário finalizado</Text>
            <Text>Total de questões: {quiz.length}</Text>
            <Text>Respostas corretas: {correctAnswers}</Text>
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
            <Stack.Navigator initialRouteName="QuestionScreen">
                <Stack.Screen name="Question" component={QuestionScreen} options={{ title: 'Questão' }} />
                <Stack.Screen name="Final" component={FinalScreen} options={{ title: 'Final' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({
    question: {
        width: Dimensions.get('window').width * 0.875,
        fontSize: theme.fontSizes.medium,
        lineHeight: 25
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.75,
        marginBottom: 20,
    },

    button: {
        padding: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.35,
        marginVertical: 20,
        opacity: .5
    },

    true: {
        backgroundColor: '#007BFF'
    },

    false: {
        backgroundColor: '#FFAA00'
    },

    selectedButton: {
        opacity: 1
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: theme.fontSizes.medium
    },

})
