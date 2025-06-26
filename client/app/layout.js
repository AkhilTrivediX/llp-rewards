import { Agdasima, Bree_Serif, Caveat, Chivo, Geist, Geist_Mono, Playfair, Playfair_Display_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplaySC = Playfair_Display_SC({
  variable: "--font-playfair-display-sc",
  subsets: ["latin"],
  weight: ["400", "700", "900"]
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
})

const breeSerif = Bree_Serif({
  variable: "--font-bree-serif",
  subsets: ["latin"],
  weight: "400"
})

const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
})

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
})

const agdasima = Agdasima({
  variable: "--font-agdasima",
  subsets: ["latin"],
  weight: ["400", "700"]
})
export const metadata = {
  title: "LLP",
  description: "Developed By Akhil Trivedi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplaySC.variable} ${caveat.variable} ${breeSerif.variable} ${playfair.variable} ${chivo.variable} ${agdasima.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
