import { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';

import globalStyles from "../utils/globalStyles";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export default function LobbyQuizScreen() {
    const route = useRoute();
    const { quiz } = route.params;

    const [connectedStudents, setConnectedStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [classLoaded, setClassLoaded] = useState(false);

    const theme = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        const reset = async () => {
            await api.post('/conectaQuestionario', JSON.stringify({ valor: false }))
            .then((response) => { console.log(response.data) })
            .catch((error) => { console.error(error) })
        }
        const loadClass = async () => {
            await api.get('/carregaTurma')
            .then(response => {
                setClassLoaded(true)
            })
            .catch(error => {
                console.error(error)
            })
        }
        
        reset();
        loadClass();
    }, [])

    useEffect(() => {
        if (!classLoaded) return;

        const getConnectedStudents = async () => {
            await api.get('/alunosConectados')
                .then(response => {
                    console.log(response.data);
                    setConnectedStudents(response.data);
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const id = setInterval(getConnectedStudents, 2000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [classLoaded]);

    const liberarQuestionario = async () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        
        await api.post('/conectaQuestionario', JSON.stringify({ valor: true }))
            .then((response) => {
                navigation.navigate('Show', { quiz: quiz })
            })
            .catch((error) => { console.error(error) });  
    }

    const renderItem = ({ item }) => (
        <Card type="outlined" style={{ marginVertical: 10 }}>
            <Card.Content>
                <Text variant="titleSmall">{item.matricula}</Text>
                <Text variant="titleSmall">{item.nome}</Text>
            </Card.Content>
        </Card>
    )

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>

            <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
                {
                    connectedStudents.length === 0 ?
                        <Text>Ainda não há alunos conectados</Text>
                        :
                        <>
                            <Text variant="titleMedium">Alunos conectados</Text>
                            <FlatList
                                data={connectedStudents}
                                keyExtractor={student => student.matricula}
                                renderItem={renderItem}
                                style={{ flexGrow: 0 }}
                            />
                            <Button mode="contained" onPress={liberarQuestionario} style={{ marginTop: 20 }}>
                                Iniciar questionário
                            </Button>
                        </>
                }

            </SafeAreaView>
        </>
    )
}