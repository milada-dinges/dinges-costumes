import { Header } from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { CartModal } from "@/components/layout/CartModal";

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
