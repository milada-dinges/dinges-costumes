'use client'
import { useState, useEffect } from "react";

import Image from "next/image";

import { useCartStore } from "@/source/useCartStore";

export const CartModal = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const closeCart = useCartStore((state) => state.closeCart);
    const isCartOpen = useCartStore((state) => state.isCartOpen);
    const totalPricePerDay = cart.reduce((sum, item) => sum + item.pricePerDay, 0);
    const today = new Date().toISOString().split('T')[0];

    const [date, setDate] = useState<string>(today);
    const [timeSlot, setTimeSlot] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [activeDropdown, setActiveDropdown] = useState< 'time' | 'duration' | null>(null);
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>('Собираем Ваш шаблон...');

    const timeSlots = ['с 9 до 10','с 10 до 11','с 18 до 19','с 19 до 20'] as const;
    const durationOptions = ['1 сутки','2 суток','3 суток','4 суток','5 суток'] as const;

    const costumesText = cart.map((item) => `- ${item.title}`).join('\n');

    const messageText = 
`Здравствуйте, нужны костюмы:
${costumesText}

Дата: ${date}
Время: ${timeSlot}
Длительность: ${duration}
Итого к оплате: ${totalPricePerDay * parseInt(duration)} ₽`;

    const handleCopy = async () => {
        try{
            await navigator.clipboard.writeText(messageText);
            setCopyStatus('success');
            setTimeout(() => setCopyStatus('idle'), 10000);
        }catch (err){
            setCopyStatus('error');
            setTimeout(() => setCopyStatus('idle'), 5000);
        }
    };

    useEffect(() => {
        if(date && timeSlot && cart.length > 0){
            setIsLoading(true);
            setLoadingText('Собираем Ваш шаблон.');

            const timer1 = setTimeout(() => {
                setLoadingText('Собираем Ваш шаблон..');
            }, 1000);
            const timer2 = setTimeout(() => {
                setLoadingText('Собираем Ваш шаблон...');
            }, 2000);
            const timer3 = setTimeout(() => {
                setLoadingText('Собираем Ваш шаблон.');
            }, 3000);
            const timer4 = setTimeout(() => {
                setLoadingText('Собираем Ваш шаблон..');
            }, 4000);
            const timer5 = setTimeout(() => {
                setLoadingText('Собираем Ваш шаблон...');
            }, 5000);
            const timer6 = setTimeout(() => {
                setIsLoading(false);
            }, 6000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
                clearTimeout(timer4);
                clearTimeout(timer5);
                clearTimeout(timer6);
            };
        }
    }, [date, timeSlot, cart.length]);




    if (!isCartOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={closeCart}></div>
            <div className="cart">
                <button className="cart__btn-close" onClick={closeCart}>
                    <svg width="24" height="24" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.89921 8.06745e-05C9.89956 0.00019005 9.89988 0.000362014 9.90052 0.00100264L10.8019 0.902409C10.8026 0.90305 10.8027 0.903346 10.8028 0.903721C10.803 0.904069 10.803 0.904452 10.8028 0.9048C10.8027 0.905159 10.8026 0.905456 10.8019 0.906096L6.30657 5.40146L10.8019 9.89682C10.8026 9.89744 10.8027 9.89775 10.8028 9.89811C10.803 9.89847 10.803 9.89885 10.8028 9.89921C10.8027 9.89955 10.8026 9.89986 10.8019 9.9005L9.90052 10.8019C9.89988 10.8026 9.89958 10.8027 9.89921 10.8028C9.89886 10.803 9.89848 10.803 9.89813 10.8028C9.89777 10.8027 9.89747 10.8026 9.89683 10.8019L5.40147 6.30655L0.906112 10.8019C0.905487 10.8026 0.905174 10.8027 0.904815 10.8028C0.904458 10.8029 0.904077 10.8029 0.903721 10.8028C0.903377 10.8027 0.903065 10.8026 0.902424 10.8019L0.0010179 9.9005C0.000377273 9.89986 0.000205308 9.89956 9.59333e-05 9.89919C-3.19778e-05 9.89884 -3.19778e-05 9.89846 9.59333e-05 9.89811C0.000205308 9.89775 0.000377273 9.89746 0.0010179 9.89682L4.49636 5.40146L0.0010179 0.906096C0.000377273 0.905471 0.000205308 0.905159 9.59333e-05 0.9048C-1.27666e-05 0.904443 -1.27666e-05 0.904062 9.59333e-05 0.903706C0.000205308 0.903362 0.000377273 0.90305 0.0010179 0.902409L0.902424 0.00100264C0.903065 0.000362014 0.903362 0.00019005 0.903737 8.06745e-05C0.904085 -4.72366e-05 0.904467 -4.72366e-05 0.904815 8.06745e-05C0.905174 0.00019005 0.905471 0.000362014 0.906112 0.00100264L5.40147 4.49635L9.89683 0.00100264C9.89746 0.000362014 9.89777 0.00019005 9.89813 8.06745e-05C9.89848 -2.80254e-05 9.89886 -2.80254e-05 9.89922 8.06745e-05H9.89921Z" fill="var(--lite)"/>
                    </svg>
                </button>
                {cart.length === 0 
                ? 
                (<div className="cart__desc">Добавьте что-нибудь в корзину</div>) 
                :
                (<>
                    <div className="cart__costumes-table-wrapper">
                        <table className="cart__costumes-table">
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td className="costume__img-mini">
                                            <Image src={item.imageUrl} fill alt=""/>
                                        </td>
                                        <td className="costume__size">{item.sizes.join(', ')}</td>
                                        <td className="costume__price">{item.pricePerDay} ₽/сутки</td>
                                        <td>
                                            <button className="cart__btn-del" onClick={() => removeFromCart(item.id)}>
                                                <svg width="22" height="24" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.9859 2H8.5V0.5C8.5 0.367392 8.44732 0.240215 8.35355 0.146447C8.25979 0.0526784 8.13261 0 8 0H4C3.86739 0 3.74021 0.0526784 3.64645 0.146447C3.55268 0.240215 3.5 0.367392 3.5 0.5V2H0.0140624L0 3.25H1.03125L1.65906 13.0625C1.67495 13.3163 1.7869 13.5544 1.97214 13.7286C2.15738 13.9027 2.402 13.9998 2.65625 14H9.34375C9.59785 14 9.84241 13.9032 10.0277 13.7294C10.2131 13.5555 10.3253 13.3176 10.3416 13.0641L10.9688 3.25H12L11.9859 2ZM3.5 12L3.21875 4H4.25L4.53125 12H3.5ZM6.5 12H5.5V4H6.5V12ZM7.25 2H4.75V1.125C4.75 1.09185 4.76317 1.06005 4.78661 1.03661C4.81005 1.01317 4.84185 1 4.875 1H7.125C7.15815 1 7.18995 1.01317 7.21339 1.03661C7.23683 1.06005 7.25 1.09185 7.25 1.125V2ZM8.5 12H7.46875L7.75 4H8.78125L8.5 12Z" fill="var(--primary)"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="cart__rental-questions">
                        <div className="cart__rental-date">
                            <label htmlFor="rental-date__label">В какой день?</label>
                            <input className="rental-date__input" type="date" id="rental-date" min={today} value={date} onChange={(e) => setDate(e.target.value)}/>
                        </div>
                        
                        <div className="cart__rental-time">
                            <label htmlFor="rental-time__label">В какое время?</label>
                            <div className="dropdown" id="rental-time">
                                <button className={`dropdown-toggle u-inline-grid ${activeDropdown === 'time' ? 'dropdown-toggle__open' : ''}`} onClick={() => setActiveDropdown(activeDropdown === 'time' ? null : 'time')}>
                                    <span className="dropdown-toggle__text">{timeSlot || 'Не выбрано'} <svg className={`arrow ${activeDropdown === 'time' ? 'arrow__open' : ''}`}  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg></span>
                                    <span className="dropdown-toggle__ghost">'Не выбрано' <svg  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg></span>
                                </button>
                                {activeDropdown === 'time' && (
                                    <ul className="dropdown__list">
                                        {timeSlots.map((slot) => (
                                            <li className="dropdown__item" key={slot}>
                                                <button className='dropdown__btn' onClick={() => {setTimeSlot(slot); setActiveDropdown(null)}}>
                                                    {slot}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="cart__rental-duration dropdown">
                            <label htmlFor="rental-duration__label">На сколько суток?</label>
                            <div className="dropdown" id="rental-duration">
                                <button className={`dropdown-toggle u-inline-grid ${activeDropdown === 'duration' ? 'dropdown-toggle__open' : ''}`} onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}>
                                    <span className="dropdown-toggle__text">{duration || 'Не выбрано'} <svg className={`arrow ${activeDropdown === 'duration' ? 'arrow__open' : ''}`}  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg></span>
                                    <span className="dropdown-toggle__ghost">'Не выбрано' <svg  width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M8.52002 2.00272e-05L4.26002 8.52002L1.98183e-05 1.92823e-05L8.52002 2.00272e-05Z" fill="currentColor"/></svg></span>
                                </button>
                                {activeDropdown === 'duration' && (
                                    <ul className="dropdown__list">
                                        {durationOptions.map((option) => (
                                            <li className="dropdown__item" key={option}>
                                                <button className='dropdown__btn' onClick={() => {setDuration(option); setActiveDropdown(null)}}>
                                                    {option}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {timeSlot !== '' && duration !== '' && cart.length > 0 
                    ? 
                    (isLoading 
                        ?
                        (<div className="cart__desc">
                            {loadingText}
                        </div>)
                        :
                        (<>
                            <pre className="cart-message">
                                {messageText}
                            </pre>
                            <div className="cart-message__btns ">
                                <button className="cart-message__copy cart__interactive" onClick={handleCopy}>
                                    {copyStatus === 'success' && 'Шаблон скопирован!'}
                                    {copyStatus === 'error' && 'Ошибка копирования'}
                                    {copyStatus === 'idle' && 'Скопировать шаблон'}
                                </button>
                                <a className="cart-message__contact cart__interactive" href="">Написать на Авито</a>
                            </div>
                        </>) 
                    )
                    : 
                    (<div className="cart__desc">
                        Заполните все поля и тут появится сообщение-шаблон.
                    </div>)
                    }

                </>)}
            </div>
        </>
    )
}