import create from "zustand"

type State = {
    size: string
    q: string
    setSize: (size: string) => void
    setQ: (q: string) => void
}

export const useSizeAndQ = create<State>((set) => ({
    size: "3x3",
    q: "10",
    setSize: (size: string) => set({ size }),
    setQ: (q: string) => set({ q }),
}))