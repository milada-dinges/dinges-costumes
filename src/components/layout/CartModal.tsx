'use client'
import Image from "next/image";

import { useCartStore } from "@/source/useCartStore";

export const CartModal = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const closeCart = useCartStore((state) => state.closeCart);
    const isCartOpen = useCartStore((state) => state.isCartOpen);
    const totalPricePerDay = cart.reduce((sum, item) => sum + item.pricePerDay, 0);

    if (!isCartOpen) return null;

    return (
        <div className="cart">
            <button className="cart__btn-close" onClick={closeCart}>закрыть</button>
            <div className="cart__costumes">
                {cart.map((item) => (
                    <div className="cart__costume" key={item.id}>
                        <div className="costume__img">
                            <Image src={item.imageUrl} fill alt=""></Image>
                        </div>
                        <div className="costume__ttl">{item.title}</div>
                        <div className="costume__size.join(, )">{item.sizes}</div>
                        <div className="costume__price">{item.pricePerDay}</div>
                        <button onClick={() => removeFromCart(item.id)}>удалить</button>
                    </div>
                ))}
                <div>Итого за сутки: {totalPricePerDay}</div>
            </div>
        </div>
    )

}