import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { showErrorToast, showSuccessToast } from '../helpers/showToast';

import globalStyles from '../utils/globalStyles';
import theme from '../theme';
import Button from '../components/Button';
import StepperButton from '../components/StepperButton';
import RadioButtons from '../components/RadioButtons';
import Podium from '../components/Podium'; // CHANGED

import useClasses from '../hooks/useClasses';
import useQuizzes from '../hooks/useQuizzes';

import api from '../services/api';

export default function ApplyQuizScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0); // CHANGED

  const { classes, fetchClassById } = useClasses();
  const { quizzes, fetchQuizById } = useQuizzes();

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [classToApply, setClassToApply] = useState(null);
  const [quizToApply, setQuizToApply] = useState(null);

  const [radioKey, setRadioKey] = useState(0);

  const [students, setStudents] = useState([]); // CHANGED

  useEffect(() => {
    const getToApply = async () => {
      if (currentStep === 1) {
        const result = await fetchQuizById(selectedQuiz);
        setQuizToApply(result);
      };

      if (currentStep === 2) {
        const result = await fetchClassById(selectedClass);
        setClassToApply(result);
      };
    }

    getToApply();
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep === 2) return;

    if (currentStep === 0 && !selectedQuiz) {
      showErrorToast('Selecione um questionário para avançar');
      return;
    }

    if (currentStep === 1 && !selectedClass) {
      showErrorToast('Selecione uma turma para avançar');
      return;
    }

    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    if (currentStep === 0) return;

    if (currentStep === 1) {
      setSelectedQuiz(null);
      setQuizToApply(null);
    };

    if (currentStep === 2) {
      setSelectedClass(null);
      setClassToApply(null);
    };

    setRadioKey(prevKey => prevKey + 1);
    setCurrentStep(prevStep => prevStep - 1);
  };

  const applyQuiz = () => {
    showSuccessToast('Questionário aplicado');
  };

  const handleAnswerSubmit = (studentId, correct) => { // CHANGED
    setStudents(prevStudents => { // CHANGED
      return prevStudents.map(student => { // CHANGED
        if (student.id === studentId) { // CHANGED
          return { ...student, acertos: student.acertos + (correct ? 1 : 0) }; // CHANGED
        } // CHANGED
        return student; // CHANGED
      }); // CHANGED
    }); // CHANGED
    setQuestionIndex(prevIndex => prevIndex + 1); // CHANGED
  }; // CHANGED

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Text style={[globalStyles.subheading, globalStyles.text, styles.stepTitle]}>Passo 1 de 3</Text>
            <Text style={[globalStyles.subheading, globalStyles.text, styles.stepDescription]}>Selecionar questionário</Text>
            {
              !quizzes ?
                <ActivityIndicator size="large" color={theme.colors.lightBlue} />
                :
                <RadioButtons key={radioKey} data={quizzes} onSelect={(value) => setSelectedQuiz(value)} />
            }
            <Button text="Próximo" onPress={nextStep} />
          </>
        );
      case 1:
        return (
          <>
            <Text style={[globalStyles.subheading, globalStyles.text, styles.stepTitle]}>Passo 2 de 3</Text>
            <Text style={[globalStyles.subheading, globalStyles.text, styles.stepDescription]}>Selecionar turma</Text>

            {
              !classes ?
                <ActivityIndicator size="large" color={theme.colors.lightBlue} />
                :
                <RadioButtons key={radioKey} data={classes} onSelect={(value) => setSelectedClass(value)} />
            }

            <View style={styles.buttonArea}>
              <StepperButton text="Voltar" onPress={prevStep} secondary />
              <StepperButton text="Próximo" onPress={nextStep} />
            </View>

          </>
        );
      case 2:
        return (
          <>
            {
              !quizToApply || !classToApply ?
                <ActivityIndicator size="large" color={theme.colors.lightBlue} /> :

                <>
                  <Text style={[globalStyles.subheading, globalStyles.text, styles.stepTitle]}>Passo 3 de 3</Text>
                  <Text style={[globalStyles.subheading, globalStyles.text, styles.stepDescription]}>Responder Perguntas</Text>

                  {
                    questionIndex < quizToApply.questions.length ? // CHANGED
                      <>
                        <Text style={globalStyles.text}>{quizToApply.questions[questionIndex].question}</Text> // CHANGED
                        <RadioButtons // CHANGED
                          key={questionIndex} // CHANGED
                          data={quizToApply.questions[questionIndex].options} // CHANGED
                          onSelect={(value) => handleAnswerSubmit(selectedClass[questionIndex % selectedClass.length].id, value === quizToApply.questions[questionIndex].answer)} // CHANGED
                        /> // CHANGED
                      </>
                      :
                      <>
                        <Text style={globalStyles.text}>Todas as perguntas foram respondidas!</Text>
                        <Button text="Aplicar Questionário" onPress={applyQuiz} />
                      </>
                  }

                  <Podium students={students} /> {/* CHANGED */}

                  <View style={styles.buttonArea}>
                    <StepperButton text="Voltar" onPress={prevStep} secondary />
                    <StepperButton text="Próximo" onPress={nextStep} />
                  </View>
                </>
            }
          </>
        );
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      {
        !classes || !quizzes ?
          <ActivityIndicator size="large" color={theme.colors.lightBlue} />
          :
          (
            classes.length === 0 || quizzes.length === 0 ?
              <Text>Não há turmas ou questionários cadastrados</Text>
              :
              renderStep()
          )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    marginTop: 75
  },

  stepDescription: {
    marginBottom: 50
  },

  buttonArea: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
});
