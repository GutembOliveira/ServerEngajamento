import { SafeAreaView } from 'react-native'; 
import { useTheme, Text } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import globalStyles from "../utils/globalStyles";

export default function FinalResultsScreen(){
    const route = useRoute();
    const { quiz } = route.params;

    const theme = useTheme();

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant='titleMedium'>Resultados finais</Text>
        </SafeAreaView>
    )
}