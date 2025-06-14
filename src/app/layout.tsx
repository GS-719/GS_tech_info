import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { Inter } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Google_Adsense from "@/Components/Google_Adsense";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
// import "bootstrap/dist/css/bootstrap.min.css";
import Bootstrap from "@/Components/Bootstrap";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GS Tech Info",
  description: "The GS Tech Info provides you 100% true information about computers",
  other: {
    "google-site-verification": "1fckTI0MM1h8fwBgsl084W1Ew-Y4wrbyTF_MOhGpmjQ",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="GS Tech Info" />
        <meta property="og:description" content="The GS Tech Info serves you the 100% accurate information about computer technologies, and sky rocket your computer journey" />
        <meta property="og:url" content="https://gs-tech-info.vercel.app/"/>
        <meta property="og:type" content="website" />
        <meta name="description" content="The GS Tech Info provides you 100% true information about computers" />
        <meta property="dc:creator" content="GS" />
        <meta name="google-adsense-account" content="ca-pub-3294386833309868" />
        <meta name="google-site-verification" content="1fckTI0MM1h8fwBgsl084W1Ew-Y4wrbyTF_MOhGpmjQ" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {<Navbar />}
        {children}
        {<Footer />}
        {<Analytics />}
        {<SpeedInsights />}
        {<Bootstrap />}
        {<Google_Adsense />}
      </body>
    </html>
  );
}
