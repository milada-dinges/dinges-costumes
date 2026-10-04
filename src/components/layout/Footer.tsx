import Link from "next/link";
import Image from "next/image";

const PatternItem = () => (
  <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_420_546)">
      <circle cx="30" cy="30" r="30" fill="var(--accent)"/>
      <path d="M30 0C35.1298 13.863 46.1977 24.7006 60.1655 29.5379L61.5 30L60.1655 30.4621C46.1977 35.2993 35.1298 46.137 30 60C24.8702 46.137 13.8023 35.2994 -0.165509 30.4621L-1.5 30L-0.165511 29.5379C13.8023 24.7007 24.8702 13.863 30 0Z" fill="var(--accent-lite)"/>
    </g>
    <defs>
      <clipPath id="clip0_420_546">
        <rect width="60" height="60" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const PatternItems = Array.from({length: 20});

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footer__pattern">
              {PatternItems.map((_, index) => (
                <div className="footer__pattern-wrapper" key={index}>
                  <PatternItem key={index}/>
                </div>
              ))}
            </div>

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