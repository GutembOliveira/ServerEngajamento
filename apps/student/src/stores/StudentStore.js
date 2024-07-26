import { create } from 'zustand';

const defaultState = {
    matricula: null
}

const useStudentStore = create((set) => ({
    ...defaultState,

    reset: () => set(defaultState),

    setMatricula : (value) => set({ matricula: value })
}))

export default useStudentStore;