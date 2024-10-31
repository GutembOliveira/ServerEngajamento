import { useEffect, useState, useCallback } from "react";
import { Alert, BackHandler, Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useTheme, ActivityIndicator, Button, Text } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

import globalStyles from "../utils/globalStyles";
import useQuizStore from "../stores/QuizStore";

export default function SolveQuestionScreen({ navigation }) {
    const route = useRoute();
    const { quiz } = route.params;

    //const [timer, setTimer] = useState(5);
    const [timeIsOver, setTimeIsOver] = useState(false);
    const [key, setKey] = useState(0);
    const [matricula, setMatricula] = useState(null);
    const [hasMatricula, setHasMatricula] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    //const quiz = useQuizStore((state) => state.quiz);
    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const setSelectedAnswer = useQuizStore((state) => state.setSelectedAnswer);
    const computeAnswer = useQuizStore((state) => state.computeAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
    const resetQuiz = useQuizStore((state) => state.reset);

    const theme = useTheme();

    useEffect(() => {
        resetQuiz();
        fetchQuiz(quiz);
    }, []);

    useEffect(() => {
        const getMatricula = async () => {
            try {
              const value = await AsyncStorage.getItem('matricula');
              setMatricula(value);
              setHasMatricula(true);
            } catch (e) {
              console.error(e)
            }
          };

          getMatricula();
    }, [])

    useEffect(() => {
        if(!hasMatricula) return;

        async function connect() {
            await api.post('/conectarAluno', JSON.stringify({
                matricula: Number(matricula)
              }))
                .then(response =>
                    console.log(response.data))
                .catch((error) => {
                    console.error(error);
                });
        }

        connect();
    }, [currentQuestionIndex, hasMatricula]);

    useFocusEffect(
        useCallback(() => {
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
        if (timeIsOver) {
            const socket = new WebSocket(process.env.EXPO_PUBLIC_WEBSOCKET_URL);

            socket.onmessage = function (event) {
                if (event.data == 'true') {
                    if(currentQuestionIndex === quiz.length - 1){
                        finishQuiz();
                    }else{
                        answerNextQuestion(); 
                    }
                    socket.close();
                }
            };

        }
    }, [timeIsOver])

    const answerNextQuestion = () => {
        computeAnswer(lastAnswer, quiz[currentQuestionIndex].alternativas[1].resposta)
        setSelectedAnswer(null);
        setKey(prevKey => prevKey + 1);
        setTimeIsOver(false);
        nextQuestion();
    }

    const finishQuiz = () => {
        computeAnswer(lastAnswer, quiz[currentQuestionIndex].alternativas[1].resposta);
        navigation.navigate('Final', { quiz: quiz });
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return(
                <>
                    <Text variant="titleMedium">Tempo esgotado</Text>
                </>
            )
        }

        return (
            <Text variant="titleLarge">{remainingTime}</Text>
        );
    };

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            {
                !isConnected ?
                <>
                    <Text style={{ marginBottom: 30}}>Offline</Text>
                </>
                :
                <>
                </>
            }

            {
                !quiz ?
                    <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                    :
                    (
                        <>
                            <CountdownCircleTimer
                                key={key}
                                isPlaying
                                duration={15}
                                size={120}
                                strokeWidth={6}
                                //'#fefefe', '#ffbcff', '#8c1d18'
                                colors={['#ededed', '#663399', '#8c1d18']}
                                colorsTime={[15, 8, 0]}
                                onComplete={() => setTimeIsOver(true)}>
                                {renderTime}
                            </CountdownCircleTimer>

                            <Text variant="titleLarge" style={{ marginVertical: 30}}>Questão {currentQuestionIndex + 1} de {quiz.length}</Text>
                            <Text variant="titleLarge" style={{ marginBottom: 30, width: '90%', textAlign: 'center' }}>{quiz[currentQuestionIndex].alternativas[1].descricao}</Text>

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
                                    currentQuestionIndex === quiz.length - 1 ?
                                        <>
                                            <Text variant="titleSmall" style={{ marginVertical: 20 }}>Aguarde a finalização do questionário</Text>
                                            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                                        </>
                                    :
                                        <>
                                            <Text variant="titleSmall" style={{ marginVertical: 20 }}>Aguarde a próxima questão</Text>
                                            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
                                        </>
                                )
                                
                            }

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
