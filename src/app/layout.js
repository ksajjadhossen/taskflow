import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/shared/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Workspace Kanban Board",
  description: "A minimal task management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black dark:bg-zinc-950 dark:text-white transition-colors duration-200">
        {/* Navbar Container: Now fully responsive to light/dark themes */}
        <div className="flex-shrink-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
          <Navbar />
        </div>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
