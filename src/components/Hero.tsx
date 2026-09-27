'use client';

import Image from "next/image";

export default function Hero() {

  return (
    <section className="hero">
      <div className="hero-info">
        <div className="hero-info__content">
          <div className="hero-info__top">
            <h1 className="hero-info__ttl">Аренда костюмов<br />в&nbsp;Барнауле!</h1>
            <p className="hero-info__desc">{'Создайте незабываемую атмосферу\nна\u00A0празднике!'}</p>
          </div>

          <div className="hero-info__points">

            <div className="hero-info__point">
              <div className="point__icon-container icon-container__stars">
                <Image className="point__icon" src='/icons/stars.svg' width={17} height={17} alt=""/>
              </div>
              <div className="point__text-container">
                <p className="point__text">чистота<br />и&nbsp;честные&nbsp;цены</p>
              </div>
            </div>

            <div className="hero-info__point">
              <div className="point__icon-container icon-container__pig">
                <Image className="point__icon" src='/icons/pig.svg' width={20} height={18} alt=""/>
              </div>
              <div className="point__text-container">
                <p className="point__text">работаем<br />без&nbsp;залога</p>
              </div>
            </div>

            <div className="hero-info__point">
              <div className="point__icon-container icon-container__agreement">
                <Image className="point__icon" src='/icons/agreement.svg' width={17} height={18} alt=""/>
              </div>
              <div className="point__text-container">
                <p className="point__text point__text-3">{'для\u00A0договора\nтолько\u00A0паспорт'}</p>
              </div>
            </div>

          </div>
        </div>

        <a className="hero-info__to-calatog" href='#catalog'>
          <Image src='/icons/stars-decor.svg' width={48} height={24} alt=""/>
          Перейти в каталог
          <Image src='/icons/stars-decor.svg' width={48} height={24} alt=""/>
        </a>

      </div>


      <div className="hero-photo">
        <Image className="hero-photo__stars-top" src='/icons/stars-fairy.svg' width={53} height={53} alt=""/>
        <div className="hero-photo__photo-container"> 
          <Image className="hero-photo__photo" src='/img/fairy.png' width={375} height={666} alt=""/>
        </div>
        <Image className="hero-photo__stars-bottom" src='/icons/stars-fairy.svg' width={53} height={53} alt=""/>
      </div>
    </section>
  );
}
