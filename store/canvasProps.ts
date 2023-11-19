import create from 'zustand'

type Props = {
    image: string | null
    setImage: (image: string | null) => void,
    file: File | null,
    setFile: (file: File | null) => void,
    radius: number,
    color: string,
    setRadius: (raduis: number) => void,
    setColor: (color: string) => void
}

export const useCanvasProps = create<Props>((set) => ({
    image: null,
    radius: 0,
    color: "#ffffff",
    file: null,
    setFile: (file: File | null) => set({ file }),
    setImage: (image: string | null) => set({ image }),
    setRadius: (radius: number) => set({ radius }),
    setColor: (color: string) => set({ color }),
}))