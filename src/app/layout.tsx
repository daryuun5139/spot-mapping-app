import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "spots on the MAP",
  description: "Find your favorite SPOTs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex h-screen flex-col")}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
