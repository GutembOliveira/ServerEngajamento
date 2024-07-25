import { SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import globalStyles from "../utils/globalStyles";
import { useRoute } from '@react-navigation/native';

export default function ShowQuizScreen() {
    const route = useRoute();
    const { quiz } = route.params;

    const theme = useTheme();

    return(
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant="titleMedium">Passagem de questões aqui</Text>
        </SafeAreaView>
    )

}