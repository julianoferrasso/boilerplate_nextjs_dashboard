import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Imprtaões para usr o react-toastify - TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Place",
  description: "Gerenciador de marketplaces",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      {/* <html lang="pt-BR" suppressHydrationWarning> */}
      <body className={`${inter.className} `}>
        <Providers>
          {children}
          <ToastContainer />
          {/* https://fkhadra.github.io/react-toastify/introduction */}
        </Providers>
      </body>
    </html>
  );
}
