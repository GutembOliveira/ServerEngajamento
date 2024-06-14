import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link } from "@react-navigation/native";
import { Formik } from 'formik';
import * as yup from 'yup';

import Input from "../components/Input";
import Button from "../components/Button";

import globalStyles from "../utils/globalStyles";
import theme from "../theme";

const validationSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().min(8, ({ min }) => `Senha deve ter no mínimo ${min} caracteres`).required('Senha é obrigatória')
})

export default function LoginScreen() {
    return (
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
            >
            {({ 
                handleChange, 
                handleBlur, 
                handleSubmit, 
                values, 
                errors,
                touched
            }) => (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.heading}>Bem-vindo de volta</Text>    
                <Input 
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                        
                <Input 
                    placeholder="Senha"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                />
            
                <View style={styles.box}>
                    <Text style={styles.right}>Esqueceu a senha?</Text>
                </View>

                {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
                }

                {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }
            
                <Button onPress={handleSubmit} text="Login" />
            
                <Text>Não tem conta? <Link to={{ screen: 'Register'}} style={globalStyles.link}>Cadastre-se</Link></Text>
            </SafeAreaView>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    box: {
        width: Dimensions.get('window').width * 0.6
    },

    right:{
        textAlign: 'right'
    },

    errorText: {
        marginTop: 10,
        textAlign: 'center',
        color: theme.colors.error
    }
})