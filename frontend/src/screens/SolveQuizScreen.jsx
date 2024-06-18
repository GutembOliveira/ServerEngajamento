import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import theme from "../theme";
import Button from "../components/Button";
import useQuizStore from "../stores/QuizStore";

export default function SolveQuizScreen({ navigation }) {
    const route = useRoute();
    const { quiz } = route.params;

    const [timer, setTimer] = useState(10);
    const [timeIsOver, setTimeIsOver] = useState(false);

    const questions = useQuizStore((state) => state.questions);
    const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const correctAnswers = useQuizStore((state) => state.correctAnswers);

    const fetchQuestions = useQuizStore((state) => state.fetchQuestions);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const setSelectedAnswer = useQuizStore((state) => state.setSelectedAnswer);
    const computeAnswer = useQuizStore((state) => state.computeAnswer);

    useEffect(() => {
        fetchQuestions(quiz.questions);
    }, []);

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

    const handleNextQuestion = () => {
        setTimer(10);
        setTimeIsOver(false);
        //setSelectedAnswer(null);
        
        computeAnswer(lastAnswer, questions[currentQuestionIndex].answer);

        //console.log(lastAnswer);
        //console.log('1 - ', questions[currentQuestionIndex].answer);
        
        navigation.navigate('Comment');

        //refresh states na tela de comentario
    };
    
    return (
        <SafeAreaView style={globalStyles.container}>
        {
            !questions ?
            <ActivityIndicator size="large" color={theme.colors.lightBlue} />
                :
                (
                    <>
                    <Text style={globalStyles.heading}>{quiz.name}</Text>
                    {
                        timeIsOver ?
                        <Text style={globalStyles.subheading}>Tempo esgotado</Text>
                        :
                        <Text style={globalStyles.subheading}>Tempo:  {timer}</Text>
                    }

                    <Text style={globalStyles.subheading}>Questão {currentQuestionIndex + 1} de {quiz.questions.length}</Text>
                    <Text style={globalStyles.subheading}>Assunto: {questions[currentQuestionIndex].topic}</Text>
                    <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>

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
                        timeIsOver &&
                        (
                            currentQuestionIndex === questions.length - 1 ?
                            <Button text="Finalizar" onPress={() => {}}/>
                            :
                            <Button text="Ver resposta" onPress={handleNextQuestion}/>
                        )
                    }
                     
                    </>
                )
        }
        </SafeAreaView>
    );
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
        opacity: .7
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
