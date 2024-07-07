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

    useFocusEffect(
        useCallback(() => {
            setTimer(7);
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

    const seeComment = () => {    
        computeAnswer(lastAnswer, quiz.alternativas[currentQuestionIndex].resposta);
        navigation.navigate('Comment');
    };

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

                    <Text style={globalStyles.subheading}>Questão {currentQuestionIndex + 1} de {quiz.alternativas.length}</Text>
                    <Text style={globalStyles.subheading}>Assunto: {quiz.alternativas[currentQuestionIndex].topic}</Text>
                    <Text style={styles.question}>{quiz.alternativas[currentQuestionIndex].descricao}</Text>

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

                    {lastAnswer !== null && (
                        <Text style={styles.answerText}>
                            Você selecionou: {lastAnswer ? "Verdadeiro" : "Falso"}
                        </Text>
                    )}

                    {
                        timeIsOver && <Button text="Ver resposta" onPress={seeComment}/>
                    }
                     
                    </>
                )
        }
        </SafeAreaView>
    );
};

const CommentScreen = ({ navigation }) => {
    const quiz = useQuizStore((state) => state.quiz);
    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const correctAnswers = useQuizStore((state) => state.correctAnswers);
    const isLastAnswerCorrect = useQuizStore((state) => state.isLastAnswerCorrect);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);

    const BackToQuestion = () => {
        nextQuestion();
        navigation.navigate('Question');
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            { lastAnswer === null ? 
                <Text>Você não respondeu esta questão</Text> :
                <>
                    <Text>Você respondeu: {lastAnswer === true ? 'Verdadeiro' : 'Falso'}</Text>
                    <Text>A resposta está: {isLastAnswerCorrect === true ? 'Correta' : 'Errada'}</Text>
                </>
            }
            <Text>Questões corretas até o momento: {correctAnswers}</Text>

            {
                currentQuestionIndex === quiz.alternativas.length - 1 ?
                <Button text="Finalizar" onPress={() => navigation.navigate('Final')}/>
                :
                <Button text="Próxima Questão" onPress={BackToQuestion}/>
            }

        </SafeAreaView>
    )
};

const FinalScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <Text>Questionário finalizado</Text>
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
                <Stack.Screen name="Comment" component={CommentScreen} options={{ title: 'Comentário' }} />
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

    buttonText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: theme.fontSizes.medium
    },

})
