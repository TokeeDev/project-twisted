import {
  Agdasima,
  Akatab,
  Akaya_Kanadaka,
  ABeeZee,
  AR_One_Sans,
} from "next/font/google";
export const agdasima = Agdasima({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal"],
  variable: "--font-agdasima",
  display: "swap",
});
export const akatab = Akatab({
  subsets: ["latin", "latin-ext", "tifinagh"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  variable: "--font-akatab",
  display: "swap",
});
export const akayaKanadaka = Akaya_Kanadaka({
  subsets: ["kannada", "latin", "latin-ext"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-akaya-kanadaka",
  display: "swap",
});
export const abeezee = ABeeZee({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-abeezee",
  display: "swap",
});
export const arOneSans = AR_One_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-ar-one-sans",
  display: "swap",
});
