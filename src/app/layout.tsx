import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "H2O Shop",
  description: "H2O Shop - The best online store in the world",
};
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          <main className="flex min-h-svh flex-1 flex-col">{children}</main>
          <Footer />
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
