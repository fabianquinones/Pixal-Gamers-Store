import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const STORAGE_KEY = 'pgs_cart_v1';

function getInitialCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function cartReducer(cart, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const idx = cart.findIndex(item => item.id === action.payload.id);
      if (idx !== -1) {
        return cart.map((item, i) =>
          i === idx ? { ...item, cantidad: item.cantidad + action.payload.cantidad } : item
        );
      }
      return [...cart, { ...action.payload }];
    }
    case 'UPDATE_QUANTITY': {
      return cart.map(item =>
        item.id === action.payload.id ? { ...item, cantidad: action.payload.cantidad } : item
      );
    }
    case 'REMOVE_ITEM': {
      return cart.filter(item => item.id !== action.payload.id);
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return cart;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, getInitialCart());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const updateQuantity = (id, cantidad) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, cantidad } });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{
      items: cart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      total,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
