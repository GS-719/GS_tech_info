import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Google_Adsense from "./Components/Google_Adsense";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GS_tech-info",
  description: "Powered by GS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3294386833309868" />
      </head>
      <body className={inter.className}>{<Navbar />}{children}{<Footer />} {<Analytics />} {< SpeedInsights />}</body>
      <Google_Adsense />
    </html>
  );
}
