import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};