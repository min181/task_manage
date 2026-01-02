import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskManage | ミニマルなタスク管理",
  description: "カテゴリ別のタスク整理と締切順の横断ビューで効率的にタスクを管理します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen max-w-4xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
          <div className="flex-grow">
            <Header />
            {children}
          </div>
          <footer className="mt-20 pt-8 border-t border-gray-100 text-center space-y-1.5 italic">
            <p className="text-[10px] md:text-xs text-gray-400 font-light tracking-tight">
              This application is a personal web application project for learning and practice purposes.
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 font-normal tracking-widest opacity-80">
              Made by <span className="font-semibold not-italic">Taki</span>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
