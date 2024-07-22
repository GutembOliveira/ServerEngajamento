import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { Alert, BackHandler, Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import useQuizStore from "../stores/QuizStore";
import { useTheme, ActivityIndicator, Button, Text } from "react-native-paper";

export default function SolveQuestionScreen({ navigation }) {
    const route = useRoute();
    const { quiz } = route.params;

    const [timer, setTimer] = useState(5);
    const [timeIsOver, setTimeIsOver] = useState(false);
    const [message, setMessage] = useState(null); // Mensagem do websocket

    //const quiz = useQuizStore((state) => state.quiz);
    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const setSelectedAnswer = useQuizStore((state) => state.setSelectedAnswer);
    const computeAnswer = useQuizStore((state) => state.computeAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
    const resetQuiz = useQuizStore((state) => state.reset);

    const theme = useTheme();
    const socket = new WebSocket(process.env.EXPO_PUBLIC_WEBSOCKET_URL);

    useEffect(() => {
        resetQuiz();
        fetchQuiz(quiz);
    }, []);

    useFocusEffect(
        useCallback(() => {
            setTimer(5);
            setTimeIsOver(false);
            setSelectedAnswer(null);
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    "Alerta",
                    "Você quer mesmo sair do questionário?",
                    [
                        {
                            text: "Cancelar",
                            onPress: () => null,
                            style: "cancel"
                        },
                        {
                            text: "Sair",
                            onPress: () => navigation.popToTop()
                        }
                    ]
                );
                return true;
            }

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    )

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

    useEffect(() => {
        if (timeIsOver) {
            // Event handler for when the connection is established
            socket.onopen = function (event) {
                console.log('WebSocket is open now.');
            };

            // Event handler for when a message is received from the server
            socket.onmessage = function (event) {
                console.log('Message from server ', event.data);
            };

            // Event handler for when the connection is closed
            socket.onclose = function (event) {
                console.log('WebSocket is closed now.');
            };

            // Event handler for when an error occurs
            socket.onerror = function (error) {
                console.log('WebSocket Error: ', error);
            };
        }

    }, [timeIsOver])

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
                                    mode={lastAnswer === true ? 'contained' : 'outlined'}
                                    onPress={() => setSelectedAnswer(true)}
                                    buttonColor={lastAnswer === true ? '#1E90FF' : theme.colors.outline}
                                    style={styles.button}
                                    disabled={timeIsOver}
                                >
                                    Verdadeiro
                                </Button>

                                <Button
                                    mode={lastAnswer === false ? 'contained' : 'outlined'}
                                    onPress={() => setSelectedAnswer(false)}
                                    buttonColor={lastAnswer === false ? '#FF4500' : theme.colors.outline}
                                    style={styles.button}
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
                                timeIsOver && (
                                    message === null ?
                                        <>
                                            <Text variant="titleSmall">Aguarde a próxima questão</Text>
                                            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                                        </>
                                        :
                                        <Text variant="titleSmall">Mensagem recebida: {message}</Text>
                                )
                            }

                            {/* {
                                timeIsOver &&
                                (
                                    currentQuestionIndex === quiz.length - 1 ?
                                        <Button mode="contained" onPress={finishQuiz} style={{ marginTop: 30 }}>
                                            Finalizar
                                        </Button>
                                        :
                                        <Button mode="contained" onPress={answerNextQuestion} style={{ marginTop: 30 }}>
                                            Próxima Questão
                                        </Button>
                                )
                            } */}
                        </>
                    )
            }
        </SafeAreaView>
    );
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
    }
})
