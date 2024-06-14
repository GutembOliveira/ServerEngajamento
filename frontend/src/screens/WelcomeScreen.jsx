import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Link } from '@react-navigation/native'
import Button from '../components/Button';
import globalStyles from "../utils/globalStyles";

export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.heading}>Bem-vindo</Text>
            <Button text="Avançar" onPress={() => navigation.navigate('Register')}/>
            <Link to={{ screen: 'Login'}} style={globalStyles.link}>Já tem conta? Login</Link>
        </SafeAreaView>
    );
}