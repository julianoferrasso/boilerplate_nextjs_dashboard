import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Place",
  description: "Gerenciador de marketplaces",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-BR">
      {/* <html lang="pt-BR" suppressHydrationWarning> */}
      <body className={`${inter.className} `}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
