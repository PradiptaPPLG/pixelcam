export interface StickerCategory {
  id: string;
  name: string;
  path: string;
  files: string[];
}

export const STICKER_CATEGORIES: StickerCategory[] = [
  {
    id: "borders",
    name: "Borders",
    path: "/stickers/borders",
    files: Array.from({ length: 20 }, (_, i) => `white${i + 1}.webp`),
  },
  {
    id: "comics",
    name: "Comics",
    path: "/stickers/comics",
    files: ["1.webp", "2.webp", "43.webp", "47.webp", "49.webp", "colorfulldesign5.webp"],
  },
  {
    id: "flowers",
    name: "Flowers",
    path: "/stickers/flowers",
    files: ["3.webp", "9.webp", "11.webp", "31.webp", "colorfulldesign2.webp", "colorfulldesign4.webp"],
  },
  {
    id: "fonts",
    name: "Fonts",
    path: "/stickers/fonts",
    files: [
      "4.webp", "6.webp", "8.webp", "14.webp", "17.webp", "19.webp", 
      "27.webp", "28.webp", "29.webp", "33.webp", "34.webp", "36.webp", 
      "38.webp", "44.webp", "52.webp", "54.webp", "colorfulldesign1.webp", "colorfulldesign3.webp"
    ],
  },
  {
    id: "pixels",
    name: "Pixels",
    path: "/stickers/pixels",
    files: [
      "5.webp", "12.webp", "13.webp", "15.webp", "16.webp", "20.webp", 
      "23.webp", "25.webp", "26.webp", "35.webp", "46.webp", "48.webp", "57.webp"
    ],
  },
  {
    id: "others",
    name: "Others",
    path: "/stickers/others",
    files: [
      "10.webp", "18.webp", "22.webp", "24.webp", "30.webp", "39.webp", 
      "40.webp", "41.webp", "45.webp", "50.webp", "51.webp", "53.webp", 
      "55.webp", "56.webp"
    ],
  },
];
