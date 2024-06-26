import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import AuthProvider from "./_components/AuthProvider";

const chivo = Chivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Learning NEXT.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={chivo.className}>
          <Navbar />
          <main className="px-5 pb-10">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
