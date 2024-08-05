import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Google_Adsense from "./Components/Google_Adsense";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GS_tech_info",
  description: "The GS_tech-info provides you 100% true information about computers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="GS Tech Info"/>
        <meta property="og:description" content="The GS_tech-info serves you the 100% accurate information about computer technologies, and sky rocket your computer journey"/>
        {/* <meta property="og:url" content="https://gs-tech-info.vercel.app/"/> */}
        <meta property="og:type" content="website"/>
        <meta name="description" content="The GS_tech-info provides you 100% true information about computers"/>
        <meta name="google-adsense-account" content="ca-pub-3294386833309868" />
        <meta name="google-site-verification" content="1fckTI0MM1h8fwBgsl084W1Ew-Y4wrbyTF_MOhGpmjQ" />
      </head>
      <body className={inter.className}>{<Navbar />}{children}{<Footer />} {<Analytics />} {< SpeedInsights />}</body>
      <Google_Adsense />
    </html>
  );
}
