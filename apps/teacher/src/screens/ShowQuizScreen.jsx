import { SafeAreaView } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import globalStyles from "../utils/globalStyles";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from "react";
import api from "../services/api";

export default function ShowQuizScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { quiz } = route.params;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const theme = useTheme();

    const liberarProximaQuestao = async () => {
        const result = await api.get('/liberaProximaQuestao');
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const finalizarQuestionario = async () => {
        const result = await api.get('/liberaProximaQuestao');
        navigation.navigate('Final')
    }

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant="titleLarge" style={{ marginVertical: 30 }}>Questão {currentQuestionIndex + 1} de {quiz.length}</Text>
            <Text variant="titleLarge" style={{ marginBottom: 30, width: '90%', textAlign: 'center' }}>{quiz[currentQuestionIndex].alternativas[1].descricao}</Text>

            {
                currentQuestionIndex === quiz.length - 1 ? (
                    <Button mode="contained" onPress={finalizarQuestionario} style={{ marginTop: 20 }}>
                        Finalizar questionário
                    </Button>
                )
                    : (
                        <Button mode="contained" onPress={liberarProximaQuestao} style={{ marginTop: 20 }}>
                            Próxima questão
                        </Button>


                    )
            }

        </SafeAreaView>
    )

}