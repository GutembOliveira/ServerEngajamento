import { create } from 'zustand';

const defaultState = {
    quiz: null,
    currentQuestionIndex: 0,
    lastAnswer: null,
    correctAnswers: 0,
    isLastAnswerCorrect: null
}

const useQuizStore = create((set) => ({
    ...defaultState,

    reset: () => set(defaultState),

    fetchQuiz: (quizData) => set({ quiz: quizData }),

    nextQuestion: () => set((state) => (
    { currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.quiz.alternativas.length - 1) })),

    setSelectedAnswer: (answer) => set({ lastAnswer: answer }),

    computeAnswer: (lastAnswer, questionAnswer) => set((state) => {
        const answer = questionAnswer === 'V' ? true : false

        if (lastAnswer === answer) {
            return {
                isLastAnswerCorrect: true,
                correctAnswers: state.correctAnswers + 1,
            };
        } else {
            return {
                isLastAnswerCorrect: false,
            };
        }
    }),
    
    setCorrectAnswer: () => set((state) => ({correctAnswers: state.correctAnswers + 1}))

}))

export default useQuizStore;