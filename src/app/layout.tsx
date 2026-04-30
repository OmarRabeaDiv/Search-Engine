import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playwrite_NO } from 'next/font/google';
import 'animate.css';

import { Roboto } from "next/font/google";

import "./globals.css";

const robot = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
})


const playwrite = Playwrite_NO({
  variable: '--font-playwrite-no', 
  display: 'swap',
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contento Searching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${playwrite.variable} ${robot.variable}`}
      
    >
      
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true} >

        {children}
        
        </body>
    </html>
  );
}
