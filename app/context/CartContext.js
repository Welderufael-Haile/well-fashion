
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to local storage when updated
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}



// import { createContext, useContext, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { data: session } = useSession();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     if (session) {
//       // If the user is logged in, fetch cart data from the server or database
//       fetchCartDataFromServer(session.user.id); 
//     } else {
//       // If the user is not logged in, use localStorage or a session cookie
//       const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
//       setCart(savedCart);
//     }
//   }, [session]);

//   const fetchCartDataFromServer = async (userId) => {
//     try {
//       const response = await fetch(`/api/cart/${userId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch cart data');
//       }
//       const data = await response.json();
//       setCart(data.cartItems || []);
//     } catch (error) {
//       console.error('Error fetching cart data:', error);
//     }
//   };

//   const addToCart = async (item) => {
//     if (session) {
//       // Add item to the user's cart in the database
//       try {
//         const response = await fetch('/api/cart', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ item }),
//         });
        
//         if (response.ok) {
//           const updatedCart = await response.json();
//           setCart(updatedCart.cartItems || []);
//         } else {
//           throw new Error('Failed to add item to cart');
//         }
//       } catch (error) {
//         console.error('Error adding item to cart:', error);
//       }
//     } else {
//       // Add item to localStorage for guest users
//       const updatedCart = [...cart, item];
//       setCart(updatedCart);
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
