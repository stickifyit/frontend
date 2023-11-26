import create from "zustand"

type State = {
    size: string
    q: number
    setSize: (size: string) => void
    setQ: (q: number) => void
}

export const useSizeAndQ = create<State>((set) => ({
    size: "3x3",
    q: 1,
    setSize: (size: string) => set({ size }),
    setQ: (q: number) => set({ q }),
}))