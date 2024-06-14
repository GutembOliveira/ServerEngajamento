import { Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";
import { useState } from "react";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from "@react-navigation/native";

import globalStyles from "../utils/globalStyles";

import Button from '../components/Button';
import Input from '../components/Input';
import theme from "../theme";

const validationSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    name: yup.string().required('Nome é obrigatório'),
    password: yup.string().min(8, ({ min }) => `Senha deve ter no mínimo ${min} caracteres`).required('Senha é obrigatória'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Senhas não coincidem')
})

export default function RegisterScreen() {
    const [isTeacher, setIsTeacher] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleIndexChange = index => {
        setSelectedIndex(index);
        index === 0 ? setIsTeacher(true) : setIsTeacher(false);
    }

    return (
        <Formik
            initialValues={{
                email: '', 
                name: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={values => console.log({...values, isTeacher})}
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
            <Text style={globalStyles.heading}>Cadastre-se</Text>

            <Input 
            placeholder="Email" 
            onChangeText={handleChange('email')} 
            onBlur={handleBlur('email')}
            value={values.email} />

            {
            (errors.email && touched.email) &&
            <Text style={styles.errorText}>{errors.email}</Text>
            }

            <Input 
            placeholder="Nome" 
            onChangeText={handleChange('name')} 
            onBlur={handleBlur('name')}
            value={values.name} />

            {
            (errors.name && touched.name) &&
            <Text style={styles.errorText}>{errors.name}</Text>
            }

            <SegmentedControlTab
                values={['Sou professor', 'Sou aluno']}
                selectedIndex={selectedIndex}
                onTabPress={handleIndexChange}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
            />

            <Input 
            placeholder="Senha" 
            onChangeText={handleChange('password')} 
            onBlur={handleBlur('password')}
            value={values.password} 
            secureTextEntry/>

            {
            (errors.password && touched.password) &&
            <Text style={styles.errorText}>{errors.password}</Text>
            }

            <Input 
            placeholder="Confirmar senha" 
            onChangeText={handleChange('confirmPassword')} 
            onBlur={handleBlur('confirmPassword')} 
            value={values.confirmPassword} 
            secureTextEntry/>

            {
                (errors.confirmPassword && touched.confirmPassword) &&
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            }

            <Button onPress={handleSubmit} text="Inscrever-se" />

            <Text>Já tem conta? <Link to={{ screen: 'Login'}} style={globalStyles.link}>Login</Link></Text>
        </SafeAreaView>
        )}
        </Formik>

    );
}

const styles = StyleSheet.create({
    tabsContainerStyle: {
        width: Dimensions.get('window').width * 0.6,
        marginVertical: 20
    },
    tabStyle: {
        paddingVertical: 10
    },
    tabTextStyle: {
        color: theme.colors.lightBlue
    },
    activeTabStyle: {
        backgroundColor: theme.colors.lightBlue
    },
    errorText: {
        color: theme.colors.error
    }
  });