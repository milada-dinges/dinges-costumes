import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return(
        <header className="header">
            <Link className="header__button" href="#rentalterms">
              условия аренды
            </Link>

            <div className="header__logo">
              <Image src='/icons/logo.svg' fill
              alt="Логотип Костюмерная Дингес" priority/>
            </div>

            <a className="header__button" href="#" target="_blank" rel="noopener noreferrer">
              написать на
              <div className="header__avito-logo">
                <Image src='/icons/avito-logo.svg' alt="Логотип Авито" fill/>
              </div>
            </a>
        </header>
    );
}
