import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import theme from "../theme";
import { shuffleArray } from "../helpers/shuffleArray";
import Button from "../components/Button";

export default function SolveQuizScreen({ navigation }) {
    const route = useRoute();
    const { quiz } = route.params;

    const [shuffledQuestions, setShuffledQuestions] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setShuffledQuestions(shuffleArray(quiz.questions));
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, shuffledQuestions.length - 1));
    };
    
    return (
        <SafeAreaView style={globalStyles.container}>
        {
            !shuffledQuestions ?
            <ActivityIndicator size="large" color={theme.colors.lightBlue} />
                :
                (
                    <>
                    <Text style={globalStyles.heading}>{quiz.name}</Text>
                    <Text style={globalStyles.subheading}>Questão {currentQuestionIndex + 1} de {quiz.questions.length}</Text>
                    <Text style={globalStyles.subheading}>Assunto: {shuffledQuestions[currentQuestionIndex].topic}</Text>
                    <Text style={styles.question}>{shuffledQuestions[currentQuestionIndex].question}</Text>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={[styles.button, styles.true, selectedAnswer === true && styles.selectedButton]}
                    onPress={() => setSelectedAnswer(true)}
                    >
                        <Text style={styles.buttonText}>Verdadeiro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.button, styles.false, selectedAnswer === false && styles.selectedButton]}
                    onPress={() => setSelectedAnswer(false)}
                    >
                        <Text style={styles.buttonText}>Falso</Text>
                    </TouchableOpacity>
                    </View>

                    {selectedAnswer !== null && (
                        <Text style={styles.answerText}>
                            Você selecionou: {selectedAnswer ? "Verdadeiro" : "Falso"}
                        </Text>
                    )}
 
                    {
                        currentQuestionIndex === shuffledQuestions.length - 1 ?
                            <Button text="Finalizar" onPress={() => {}}/>
                            :
                            <Button text="Ver resposta" onPress={handleNextQuestion}/>
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
