import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme, Button, Text, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import globalStyles from "../utils/globalStyles";
import Podium from '../components/Podium';
import api from '../services/api';

export default function FinalQuizScreen() {
    //const route = useRoute();
    //const { quiz } = route.params;
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    
    const theme = useTheme();

    useEffect(() => {
        async function getPodium(){
            const id = setInterval(async () => {
                try {
                    const response = await api.get('/retornaPodio');
                    setStudents(response.data);
                } catch (error) {
                    console.error('Error making API call:', error);
                }
            }, 2000);
    
            setIntervalId(id);
            // await api.get('/retornaPodio')
            // .then(response => {
            //     setStudents(response.data)
            // })
            // .catch(error => {
            //     console.error(error);
            // })
        }

        getPodium();
    }, []);

    const handleEnd = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        navigation.popToTop();
    };


    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant='headlineSmall'>Questionário finalizado</Text>
            
            {
                students.length === 0 ? (
                    <ActivityIndicator animating={true} size="large" color={theme.colors.primary} style={{ marginVertical: 20 }}/>
                ) : (
                    <Podium students={students} />
                )

            }
           
            <Button
                mode="contained"
                style={{ padding: 10 }}
                onPress={handleEnd}>
                Encerrar
            </Button>


        </SafeAreaView>
    )
}