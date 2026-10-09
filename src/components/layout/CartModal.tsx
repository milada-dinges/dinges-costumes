'use client'
import { useState } from "react";

import Image from "next/image";

import { useCartStore } from "@/source/useCartStore";

export const CartModal = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const closeCart = useCartStore((state) => state.closeCart);
    const isCartOpen = useCartStore((state) => state.isCartOpen);
    const totalPricePerDay = cart.reduce((sum, item) => sum + item.pricePerDay, 0);
    const today = new Date().toISOString().split('T')[0];

    const [date, setDate] = useState<string>('');
    const [timeSlot, setTimeSlot] = useState<string>('');
    const [duration, setDuration] = useState<string>('1');
    const [activeDropdown, setActiveDropdown] = useState< 'time' | 'duration' | null>(null);

    const timeSlots = ['с 9 до 10','с 10 до 11','с 18 до 19','с 19 до 20'];
    const durationOptions = ['1 сутки','2 суток','3 суток','4 суток','5 суток'] as const;

    if (!isCartOpen) return null;

    return (
        <div className="cart">
            <button className="cart__btn-close" onClick={closeCart}>закрыть</button>
            <div className="cart__costumes">
                {cart.map((item) => (
                    <div className="cart__costume" key={item.id}>
                        <div className="costume__img-mini">
                            <Image src={item.imageUrl} fill alt=""></Image>
                        </div>
                        <div className="costume__ttl">{item.title}</div>
                        <div className="costume__size">{item.sizes.join(', ')}</div>
                        <div className="costume__price">{item.pricePerDay} ₽/сутки</div>
                        <button onClick={() => removeFromCart(item.id)}>
                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9859 2H8.5V0.5C8.5 0.367392 8.44732 0.240215 8.35355 0.146447C8.25979 0.0526784 8.13261 0 8 0H4C3.86739 0 3.74021 0.0526784 3.64645 0.146447C3.55268 0.240215 3.5 0.367392 3.5 0.5V2H0.0140624L0 3.25H1.03125L1.65906 13.0625C1.67495 13.3163 1.7869 13.5544 1.97214 13.7286C2.15738 13.9027 2.402 13.9998 2.65625 14H9.34375C9.59785 14 9.84241 13.9032 10.0277 13.7294C10.2131 13.5555 10.3253 13.3176 10.3416 13.0641L10.9688 3.25H12L11.9859 2ZM3.5 12L3.21875 4H4.25L4.53125 12H3.5ZM6.5 12H5.5V4H6.5V12ZM7.25 2H4.75V1.125C4.75 1.09185 4.76317 1.06005 4.78661 1.03661C4.81005 1.01317 4.84185 1 4.875 1H7.125C7.15815 1 7.18995 1.01317 7.21339 1.03661C7.23683 1.06005 7.25 1.09185 7.25 1.125V2ZM8.5 12H7.46875L7.75 4H8.78125L8.5 12Z" fill="var(--primary)"/>
                            </svg>
                        </button>
                    </div>
                ))}
                <div>Итого: {totalPricePerDay} ₽/за сутки</div>
            </div>
            <label htmlFor="rental-date"></label>
            <input className="" type="date" id="rental-date" min={today} value={today} onChange={(e) => setDate(e.target.value)}/>
            <div>
                <button onClick={() => setActiveDropdown(activeDropdown === 'time' ? null : 'time')}>
                    {timeSlot || 'Выберите время'}
                </button>
                {activeDropdown === 'time' && (
                    <ul>
                        {timeSlots.map((slot) => (
                            <li key={slot}
                            onClick={() => {setTimeSlot(slot); setActiveDropdown(null)}}>
                                {slot}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <button onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}>
                    {duration || 'Выберите кол-во суток'}
                </button>
                {activeDropdown === 'duration' && (
                    <ul>
                        {durationOptions.map((option) => (
                            <li key={option}
                            onClick={() => {setDuration(option); setActiveDropdown(null)}}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}