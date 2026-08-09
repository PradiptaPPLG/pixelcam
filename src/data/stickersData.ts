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
    files: [
      "1.webp", "2.webp", "43.webp", "47.webp", "49.webp", "58.webp", "colorfulldesign5.webp",
      "comics1.webp", "comics3.webp", "comics5.webp", "comicsnew1.webp", "comicsnew2.webp",
      "comicsnew3.webp", "comicsnew4.webp", "comicsnew5.webp", "comicsnew6.webp", "comicsnew7.webp",
      "comicsnew8.webp", "comicsnew9.webp", "comicsnew10.webp", "comicsnew11.webp", "comicsnew12.webp",
      "comicsnew13.webp", "comicsnew14.webp", "comicsnew15.webp",
    ],
  },
  {
    id: "flowers",
    name: "Flowers",
    path: "/stickers/flowers",
    files: [
      "3.webp", "9.webp", "11.webp", "31.webp", "colorfulldesign2.webp", "colorfulldesign4.webp",
      "flowers1.webp", "flowers2.webp", "flowers3.webp", "flowers4.webp", "flowers5.webp",
      "flowers6.webp", "flowers7.webp", "flowers8.webp", "flowers9.webp", "flowers10.webp",
      "flowers11.webp", "flowers12.webp", "flowers13.webp", "flowers14.webp", "flowers15.webp",
    ],
  },
  {
    id: "fonts",
    name: "Fonts",
    path: "/stickers/fonts",
    files: [
      "4.webp", "6.webp", "8.webp", "14.webp", "17.webp", "19.webp", 
      "27.webp", "28.webp", "29.webp", "33.webp", "34.webp", "36.webp", 
      "38.webp", "44.webp", "52.webp", "54.webp", "69.webp", "colorfulldesign1.webp", "colorfulldesign3.webp"
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
      "fox.webp", "taylorswift.webp",
      "10.webp", "18.webp", "22.webp", "24.webp", "30.webp", "39.webp", 
      "40.webp", "41.webp", "45.webp", "50.webp", "51.webp", "53.webp", 
      "55.webp", "56.webp", "59.webp", "60.webp", "61.webp", "62.webp",
      "63.webp", "64.webp", "65.webp", "66.webp", "67.webp", "68.webp",
      "70.webp", "71.webp", "73.webp", "73_1.webp", "74.webp", "75.webp",
      "price.webp", "star1.webp", "star2.webp", "teddy.webp"
    ],
  },
];
