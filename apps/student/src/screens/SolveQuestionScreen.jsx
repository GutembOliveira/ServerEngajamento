import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, BackHandler, Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import useQuizStore from "../stores/QuizStore";
import { useTheme, ActivityIndicator, Button, Text } from "react-native-paper";
import RNEventSource from "react-native-event-source";

// const [currentNumber, setCurrentNumber] = useState(0); // Estado para o número atual do evento SSE
//     useEffect(() => {
//         const eventSource = new RNEventSource('https://serverengajamento.onrender.com/proxQuestao');
//         
//         return () => {
//             eventSource.close();
//         }
//     }, []);

export default function SolveQuestionScreen({ navigation }) {
    const route = useRoute();
    const { quiz } = route.params;

    const [timer, setTimer] = useState(5);
    const [timeIsOver, setTimeIsOver] = useState(false);
    const [currentNumber, setCurrentNumber] = useState(0); // Estado para o número atual do evento SSE

    //const quiz = useQuizStore((state) => state.quiz);
    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const setSelectedAnswer = useQuizStore((state) => state.setSelectedAnswer);
    const computeAnswer = useQuizStore((state) => state.computeAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
    const resetQuiz = useQuizStore((state) => state.reset);

    const theme = useTheme();
    //const eventSource = new RNEventSource(`${process.env.EXPO_PUBLIC_API_URL}/proxQuestao`);
    const eventSourceRef = useRef(null);
    const prevTimeIsOver = useRef(false);
    
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
        if (timeIsOver && !prevTimeIsOver.current) {
            eventSourceRef.current = new RNEventSource(process.env.EXPO_PUBLIC_API_URL + '/proxQuestao');

            eventSourceRef.current.addEventListener('message', (event) => {
                //const data = JSON.parse(event.data);
                console.log(event);
                //setCurrentNumber(data.number);
            });

            eventSourceRef.current.addEventListener('error', (event) => {
                console.error('Error connecting', event);
            });
        }

        if (!timeIsOver && prevTimeIsOver.current) {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        }

        prevTimeIsOver.current = timeIsOver;

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, [timeIsOver]);

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

                            {/* {
                                timeIsOver && {
                                    eventSource.addEventListener('message', (event) => {
                                        const data = JSON.parse(event.data);
                                        console.log(data);
                                    });
                                        
                                    eventSource.addEventListener('error', (event) => {
                                        console.error('Error connecting', event);
                                    })
                                }
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
