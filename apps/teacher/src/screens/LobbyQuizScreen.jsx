import { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';

import globalStyles from "../utils/globalStyles";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export default function LobbyQuizScreen() {
    const route = useRoute();
    const { quiz } = route.params;

    const [connectedStudents, setConnectedStudents] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    const theme = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        const loadClass = async () => {
            await api.get('/carregaTurma')
                .then(response => {

                })
                .catch(error => {
                    console.error(error)
                })
        }

        loadClass();
    }, [])

    useEffect(() => {
        const getConnectedStudents = async () => {
            await api.get('/alunosConectados')
                .then(response => {
                    setConnectedStudents(response.data);
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const id = setInterval(getConnectedStudents, 2000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, []);

    const liberarQuestionario = async () => {
        await api.post('/conectaQuestionario', JSON.stringify({ valor: true }))
            .then((response) => {
                () => navigation.navigate('Show', { quiz: quiz })
            })
            .catch((error) => { console.error(error) });
    }

    const renderItem = ({ student }) => (
        <Card type="outlined">
            <Card.Content>
                <Text variant="titleSmall">{student.idAluno}</Text>
                <Text variant="titleSmall">{student.Nome}</Text>
            </Card.Content>
        </Card>
    )

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            {
                !connectedStudents || connectedStudents.length === 0 ?
                    <Text>Ainda não há alunos conectados</Text>
                    :
                    <>
                        <Text variant="titleMedium">Alunos conectados</Text>
                        <FlatList
                            data={connectedStudents}
                            keyExtractor={student => student.matricula}
                            renderItem={renderItem}
                        />
                        <Button mode="contained" onPress={liberarQuestionario} style={{ marginTop: 20 }}>
                            Iniciar questionário
                        </Button>
                    </>
            }

        </SafeAreaView>
    )
}