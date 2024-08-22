import { create } from "zustand";

interface IState {
    isRunning: boolean
    score: {
        player1: number
        player2: number
    }
    setIsRunning: () => void
    incrPlayer1: () => void
    incrPlayer2: () => void
    clearAll: () => void
}

export const useStore = create<IState>((set) => ({
    isRunning: false,
    score: {
        player1: 0,
        player2: 0,
    },
    setIsRunning: () => set((state) => ({
        isRunning: !state.isRunning
        
    })),
    incrPlayer1: () => set((state) => ({
        score: {
            ...state.score,
            player1: state.score.player1 + 1
        }
    })),
    incrPlayer2: () => set((state) => ({
        score: {
            ...state.score,
            player2: state.score.player2 + 1
        }
    })),
    clearAll: () => set(() => ({score: {
        player1: 0,
        player2: 0
    }})),
}))