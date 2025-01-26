import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/page.css";
import "../app/products/products.module.css";
import "../app/products/[slug]/page.module.css";
import "../app/wishlists/styles.module.css";
import Navbar from "@/components/navbar";
import { FooterWithSocialLinks } from "@/components/footer";
import { ToastContainer } from "react-toastify";

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
  icons: {
    icon: "/favicon.ico", // ✅ Correct way to define favicon in Next.js 13+
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <Navbar />
        <ToastContainer />
        {children}
        <FooterWithSocialLinks />
      </body>
    </html>
  );
}
