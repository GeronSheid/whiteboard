import { create } from "zustand";

interface IState {
    score: {
        player1: number
        player2: number
    }
    incrPlayer1: () => void
    incrPlayer2: () => void
    clearAll: () => void
}

export const useStore = create<IState>((set) => ({
    score: {
        player1: 0,
        player2: 0,
    },
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