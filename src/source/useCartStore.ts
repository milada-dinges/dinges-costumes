import { create } from 'zustand'
import { Costume } from '@/types'

interface CartState {
    cart: Costume[];
    isCartOpen: boolean;
    addToCart: (costume: Costume) => void;
    removeFromCart: (id: Costume['id']) => void;
    openCart: () => void;
    closeCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    isCartOpen: false,

    addToCart: (costume) => set((state) => {
        const isAlreadyInCart = state.cart.some((item) => item.id === costume.id);
        if (isAlreadyInCart) return state;
        return { cart: [...state.cart, costume] }
    }),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
    })),
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
}));