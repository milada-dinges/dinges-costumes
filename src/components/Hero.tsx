import Link from "next/link";
import Image from "next/image";


export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-info">

        <div className="hero-info__top">
          <h1 className="hero-info__ttl">Аренда костюмов и&nbsp;ростовых кукол в&nbsp;Барнауле</h1>
          <p className="hero-info__desc">Создайте незабываемую атмосферу на&nbsp;празднике или корпоративе!</p>
        </div>

        <div className="hero-info__points">

          <div className="hero-info__point">
            <div className="point__icon-container">
              <Image className="point__icon" src={} width={} height={} alt="звезды"></Image>
            </div>
            <div className="point__text-container">
              <p className="point__text">чистота и&nbsp;честные цены</p>
            </div>
          </div>

          <div className="hero-info__point">
            <div className="point__icon-container">
              <Image className="point__icon" src={} width={} height={} alt="копилка"></Image>
            </div>
            <div className="point__text-container">
              <p className="point__text">работаем без&nbsp;залога</p>
            </div>
          </div>

          <div className="hero-info__point">
            <div className="point__icon-container">
              <Image className="point__icon" src={} width={} height={} alt="договор"></Image>
            </div>
            <div className="point__text-container">
              <p className="point__text">для договора только&nbsp;паспорт</p>
            </div>
          </div>

        </div>

        <p className="hero-info__desc">Ждем вас на&nbsp;примерку по&nbsp;предварительной записи!</p>

        <button className="hero-info__to-calatog">
          <Image src={} width={} height={} alt="звезды"></Image>
          Перейти в каталог
          <Image src={} width={} height={} alt="звезды"></Image>
        </button>

      </div>


      <div className="hero-photo">
        <Image className="hero-photo__stars" src={} width={} height={} alt="звезды"></Image>
        <Image className="hero-photo__photo" src={} width={} height={} alt="фея"></Image>
        <Image className="hero-photo__stars" src={} width={} height={} alt="звезды"></Image>
      </div>
    </section>
  );
}
