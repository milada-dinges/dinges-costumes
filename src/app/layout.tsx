import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <div className="pageWrapper">
          <header className="header">
            <Link className="button-hdr" href="#rentalterms">
              условия аренды
            </Link>
            
            <Image className="header-logo"
            src='/icons/logo.svg' 
            alt="Логотип Костюмерная Дингес" 
            width={300} height={107} priority/>

            <a className="button-hdr" href="#" target="_blank" rel="noopener noreferrer">
              написать на <img src="#" alt="" /> 
            </a>
          </header>

          <main className="main">
            {children}
          </main>

          <footer className="footer">
            <div>
              <div>
                <p>СМЗ ФИО</p>
                <p>ИНН: 232327323633455</p>
                <Link href="/privacy-policy">Политика конфиденциальности</Link>
              </div>
              <nav>
                <a href="#" target="_blank" rel="noopener noreferrer">Отзывы на Авито</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Отзывы на Авито</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Отзывы на Авито</a>
              </nav>
            </div>

            <div>
              <p>© ФИО, 2026. Все права защищены.</p>
              <p>г.Барнаул</p>
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}
