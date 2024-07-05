import { SafeAreaView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function WaitingQuizScreen() {
    const [intervalId, setIntervalId] = useState(null);
    const [message, setMessage] = useState('')

    useEffect(() => {
        const askForQuiz = async () => {
            try {
                const response = await api.get('/questionarioAluno');
                setMessage(response.data)

                // Check the condition to stop the loop
                // if (data.success) {
                //     clearInterval(intervalId);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Set up the interval
        const id = setInterval(askForQuiz, 2000);
        setIntervalId(id);

        // Cleanup the interval on component unmount
        return () => clearInterval(id);
    }, []);

    return (
        <SafeAreaView style={globalStyles.container}>
            <>
                <Text>Conectado</Text>
                <Text>Aguardando liberação</Text>
                {
                    message !== '' &&
                    <Text>{message}</Text>
                }
            </>
        </SafeAreaView>
    )
}