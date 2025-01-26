import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { FooterWithSocialLinks } from "@/components/footer";
import { ToastContainer } from "react-toastify";
import dotenv from "dotenv";
dotenv.config();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My NEXT App",
  description: "A hub for all your learning needs",
  icons: [
    { rel: "icon", url: "/favicon.ico" }, // ✅ Favicon for all browsers
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <ToastContainer />
        {children}
        <FooterWithSocialLinks />
      </body>
    </html>
  );
}
