import type { Metadata } from "next";

import Header from '../components/Header'
import Footer from '../components/Footer'

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
        </div>
      </body>
    </html>
  );
}
