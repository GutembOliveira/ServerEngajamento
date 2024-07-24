import { SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import globalStyles from "../utils/globalStyles";

export default function ShowQuizScreen() {
    const theme = useTheme();

    return(
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant="titleMedium">Passagem de questões aqui</Text>
        </SafeAreaView>
    )

}