"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Create Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Function to Add Item to Cart
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Function to Remove Item from Cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to Use Cart Context
export const useCart = () => useContext(CartContext);
