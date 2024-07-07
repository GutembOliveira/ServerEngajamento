import { SafeAreaView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import globalStyles from '../utils/globalStyles';
import api from '../services/api';

export default function WaitingQuizScreen() {
    const [intervalId, setIntervalId] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const askForQuiz = async () => {
            try {
                const response = await api.get('/questionarioAluno');

                console.log(response.data);
                //setMessage(response.data)

                if (response.data !== 'questionario não liberado') {
                    setMessage('Questionário Liberado')
                    setIsSuccess(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if(!isSuccess){
            const id = setInterval(askForQuiz, 2000);
            return () => clearInterval(id);
        }

    }, [isSuccess]);

    return (
        <SafeAreaView style={globalStyles.container}>
            <>
                <Text>Conectado</Text>

                {
                    isSuccess ?
                    <Text>Liberado</Text>
                    :
                    <Text>NÃO Liberado</Text>
                }

                {/* <Text>Aguardando liberação</Text>
                {
                    message !== '' &&
                    <Text>{message}</Text>
                } */}
            </>
        </SafeAreaView>
    )
}