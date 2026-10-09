import type { Metadata } from "next";

import { Header } from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { CartModal } from "@/components/layout/CartModal";

import "./globals.css";

export const metadata: Metadata = {
  title: "Аренда костюмов и ростовых кукол в Барнауле | Костюмерная Дингес",
  description: "Прокат карнавальных костюмов, надувных и ростовых кукол в Барнауле. Аренда без залога, просто по паспорту. Безопасная сделка и отзывы на Авито! Заходите!",
  icons: {
    icon: "/favicon.ico", // Файл иконки должен лежать в папке public
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="ru">
      <body>
        <div className="page-wrapper">
          <Header/>
          <main>{children}</main>
          <Footer/>
          <CartModal/>
        </div>
      </body>
    </html>
  );
}
