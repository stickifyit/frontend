import axios from "@/lib/axios";

export interface Sticker {
    _id: string;
    name: string;
    description: string;
    snapshot: string;
    __v: number;
}

const demoStickers: Sticker[] = [
  {
    _id: "demo-bear",
    name: "bear",
    description: "Cute and cozy bear stickers doing everyday activities.",
    snapshot: "/hero/bear.png",
    __v: 0
  },
  {
    _id: "demo-bears-and-trees",
    name: "bears and trees",
    description: "Delightful bears exploring the forest under shady green trees.",
    snapshot: "/hero/bears-and-trees.png",
    __v: 0
  },
  {
    _id: "demo-kitties-pack",
    name: "kitties pack",
    description: "An adorable pack of playful kittens playing and sleeping.",
    snapshot: "/hero/kitties-pack.png",
    __v: 0
  },
  {
    _id: "demo-colored-bears",
    name: "colored bears",
    description: "Vibrant and colorful bears to add a rainbow of joy to your sheets.",
    snapshot: "/hero/colored-bears.png",
    __v: 0
  },
  {
    _id: "demo-colored-cats",
    name: "colored cats",
    description: "Beautifully colored cats in various sweet and whimsical poses.",
    snapshot: "/hero/colored-cats.png",
    __v: 0
  },
  {
    _id: "demo-rabbits-pack",
    name: "rabbits pack",
    description: "Charming fluffy rabbits hopping around and eating carrots.",
    snapshot: "/hero/rabbits-pack.png",
    __v: 0
  },
  {
    _id: "demo-bears-pack",
    name: "bears pack",
    description: "A diverse pack of cute cartoon bears with warm expressions.",
    snapshot: "/hero/bears-pack.png",
    __v: 0
  },
  {
    _id: "demo-black-cat",
    name: "black cat",
    description: "Sleek and mysterious black cats in fun, playful, and curious poses.",
    snapshot: "/hero/black-cat.png",
    __v: 0
  }
];

export const fetchStickerSheets = async () => 
  axios.get<Sticker[]>("/sticker-sheet/all")
    .then((res) => res.data)
    .catch((err) => {
      console.warn("Failing to fetch sticker sheets, returning demo data", err);
      return demoStickers;
    });

export const getStickerSheet = async (name: string) => 
  axios.get<Sticker>(`/sticker-sheet/${name}`)
    .then((res) => {
      console.log(res.data);
      console.log(name);
      return res.data;
    })
    .catch((err) => {
      console.warn(`Failing to fetch sticker sheet "${name}", returning demo data`, err);
      const decodedName = decodeURIComponent(name).toLowerCase().trim();
      const found = demoStickers.find(s => 
        s.name.toLowerCase().trim() === decodedName ||
        s.name.toLowerCase().replaceAll("-", " ").trim() === decodedName
      );
      return found || demoStickers[0];
    });