import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import useQuizStore from "../stores/QuizStore";
import Button from "../components/Button";

export default function CommentQuestionScreen() {
    const lastAnswer = useQuizStore((state) => state.lastAnswer);
    const correctAnswers = useQuizStore((state) => state.correctAnswers);
    const isLastAnswerCorrect = useQuizStore((state) => state.isLastAnswerCorrect);

    return (
        <View style={globalStyles.container}>
            <Text>Você respondeu: {lastAnswer === true ? 'Verdadeiro' : 'Falso'}</Text>
            <Text>A resposta está: {isLastAnswerCorrect === true ? 'Correta' : 'Errada'}</Text>
            <Text>Questões corretas até o momento: {correctAnswers}</Text>

            <Button text="Próxima Questão" onPress={() => {}}/>
        </View>
    )
}