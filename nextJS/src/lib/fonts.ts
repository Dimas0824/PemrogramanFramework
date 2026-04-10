import { Roboto } from "next/font/google";

// Memusatkan app-level fonts agar router halaman dapat menerapkan satu font default secara konsisten.
export const appSansFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
