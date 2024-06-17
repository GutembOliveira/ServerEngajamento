import { create } from 'zustand';

const useQuizStore = create((set) => ({
    questions: null,
    currentQuestionIndex: 0,
    lastAnswer: null,
    correctAnswers: 0,

    fetchQuestions: (questionsArray) => set({ questions: questionsArray }),

    nextQuestion: () => set((state) => (
    { currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1) })),

    setSelectedAnswer: (answer) => set({ lastAnswer: answer }),

    setCorrectAnswer: () => set((state) => ({correctAnswers: state.correctAnswers + 1}))

}))

export default useQuizStore;