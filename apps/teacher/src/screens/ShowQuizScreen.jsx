import { useCallback, useEffect } from 'react';
import { Alert, BackHandler, SafeAreaView, StyleSheet } from "react-native";
import { Button, Icon, Surface, Text, useTheme } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import globalStyles from "../utils/globalStyles";
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState } from "react";
import api from "../services/api";

export default function ShowQuizScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { quiz } = route.params;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeIsOver, setTimeIsOver] = useState(false);
    const [key, setKey] = useState(0);
    const [visible, setVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    const theme = useTheme();

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

    useFocusEffect(
        useCallback(() => {
            setTimeIsOver(false);
        }, [])
    );

    const liberarProximaQuestao = async () => {
        const result = await api.get('/liberaProximaQuestao');
        setVisible(false);
        setKey(prevKey => prevKey + 1);
        setTimeIsOver(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const finalizarQuestionario = async () => {
        const result = await api.get('/liberaProximaQuestao');
        navigation.navigate('Final')
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return (
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

            <CountdownCircleTimer
                key={key}
                isPlaying
                duration={15}
                size={120}
                strokeWidth={6}
                colors={['#ededed', '#663399', '#8c1d18']}
                colorsTime={[15, 8, 0]}
                onComplete={() => setTimeIsOver(true)}>
                {renderTime}
            </CountdownCircleTimer>


            <Text variant="titleLarge" style={{ marginVertical: 30 }}>Questão {currentQuestionIndex + 1} de {quiz.length}</Text>
            <Text variant="titleLarge" style={{ marginBottom: 30, width: '90%', textAlign: 'center' }}>{quiz[currentQuestionIndex].alternativas[1].descricao}</Text>
            <Text variant='titleMedium'>Resposta correta</Text>

            {
                visible ?
                    <Button mode="text" onPress={() => setVisible(!visible)} style={{ marginTop: 20 }} disabled={!timeIsOver}>
                        <Icon source="eye-off" size={20} />
                    </Button>

                    :

                    <Button mode="text" onPress={() => setVisible(!visible)} style={{ marginTop: 20 }} disabled={!timeIsOver}>
                        <Icon source="eye" size={20} />
                    </Button>

            }

            {
                visible ?
                    (
                        quiz[currentQuestionIndex].alternativas[1].resposta === 'V' ?
                            <Text variant='titleLarge' style={{ marginVertical: 10 }}>Verdadeiro</Text>
                            :
                            <Text variant='titleLarge' style={{ marginVertical: 10 }}>Falso</Text>
                    ) : (
                        <Surface style={styles.surface} elevation={4}></Surface>
                    )
            }


            {
                currentQuestionIndex === quiz.length - 1 ? (
                    <Button mode="contained" onPress={finalizarQuestionario} style={{ marginTop: 20 }} disabled={!timeIsOver}>
                        Finalizar questionário
                    </Button>
                )
                    : (
                        <Button mode="contained" onPress={liberarProximaQuestao} style={{ marginTop: 20 }} disabled={!timeIsOver}>
                            Próxima questão
                        </Button>
                    )
            }

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        marginVertical: 20,
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
});