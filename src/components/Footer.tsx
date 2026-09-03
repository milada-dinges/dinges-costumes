import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footer__top">
              <div className="footer__info">
                <p>СМЗ ФИО</p>
                <p>ИНН: 232327323633455</p>
                <Link href="/privacy-policy">Политика конфиденциальности</Link>
              </div>
              <nav className="footer__nav">
                <a href="#" target="_blank" rel="noopener noreferrer">Отзывы на Авито</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Профиль на Авито</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Написать в ЛС на Авито</a>
              </nav>
            </div>

            <div className="footer__btm">
              <p>© ФИО, 2026. Все права защищены.</p>
              <p>г.Барнаул</p>
            </div>
        </footer>
    );
}