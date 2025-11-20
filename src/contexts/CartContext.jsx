import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getCarritoBackend,
  addItemCarritoBackend,
  updateItemCarritoBackend,
  eliminarItemCarritoBackend,
  vaciarCarritoBackend,
  checkoutVenta
} from '../Api';

const STORAGE_KEY = 'pgs_cart_v1';
const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const [syncBackend, setSyncBackend] = useState(false);

  // Cargar carrito local al inicio
  useEffect(() => {
    setItems(loadCart());
  }, []);

  // Al cambiar usuario, sincronizar con backend si existe sesión
  useEffect(() => {
    setSyncBackend(!!user);
    if (user) {
      (async () => {
        try {
          const backend = await getCarritoBackend(user.id);
          const backendItems = (backend.items || []).map(it => ({
            id: it.idProducto,
            nombre: it.nombreProducto,
            precio: it.precioUnitario,
            imagen: '',
            cantidad: it.cantidad,
            _idItem: it.idItem
          }));
          const local = loadCart();
          const merged = [...backendItems];
          local.forEach(l => {
            const existing = merged.find(m => m.id === l.id);
            if (existing) {
              existing.cantidad += l.cantidad;
            } else {
              merged.push(l);
            }
          });
          setItems(merged);
        } catch (e) {
          console.warn('No se pudo sincronizar carrito backend:', e.message);
        }
      })();
    } else {
      setItems(loadCart());
    }
  }, [user]);

  // Persistir en localStorage (sin metadatos internos)
  useEffect(() => {
    persist(items.map(({ _idItem, ...rest }) => rest));
  }, [items]);

  const addItem = useCallback(async ({ id, nombre, precio, imagen, cantidad = 1 }) => {
    if (id == null) return;
    setItems(prev => {
      const existing = prev.find(p => p.id === id);
      if (existing) {
        return prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + cantidad } : p);
      }
      return [...prev, { id, nombre, precio, imagen, cantidad }];
    });
    if (syncBackend && user) {
      try {
        const res = await addItemCarritoBackend(user.id, {
          idProducto: id,
          nombreProducto: nombre,
          cantidad,
          precioUnitario: precio
        });
        // Actualizar con id interno si llega
        if (res?.idItem) {
          setItems(prev => prev.map(p => p.id === id ? { ...p, _idItem: res.idItem } : p));
        }
      } catch (e) {
        console.warn('Error enviando item al backend', e.message);
      }
    }
  }, [syncBackend, user]);

  const updateQuantity = useCallback(async (id, nuevaCantidad) => {
    const nueva = Math.max(1, nuevaCantidad);
    setItems(prev => prev.map(p => p.id === id ? { ...p, cantidad: nueva } : p));
    if (syncBackend && user) {
      const item = items.find(p => p.id === id);
      if (item && item._idItem) {
        try { await updateItemCarritoBackend(item._idItem, nueva); } catch {}
      }
    }
  }, [syncBackend, user, items]);

  const removeItem = useCallback(async (id) => {
    const target = items.find(p => p.id === id);
    setItems(prev => prev.filter(p => p.id !== id));
    if (syncBackend && user && target?._idItem) {
      try { await eliminarItemCarritoBackend(target._idItem); } catch {}
    }
  }, [syncBackend, user, items]);

  const clearCart = useCallback(async () => {
    setItems([]);
    if (syncBackend && user) {
      try { await vaciarCarritoBackend(user.id); } catch {}
    }
  }, [syncBackend, user]);

  const checkout = useCallback(async () => {
    if (!user) throw new Error('Debes iniciar sesión para pagar');
    if (items.length === 0) throw new Error('Carrito vacío');
    try {
      const venta = await checkoutVenta(user.id);
      await clearCart();
      return venta;
    } catch (e) {
      throw new Error(e.response?.data?.mensaje || 'Error en checkout');
    }
  }, [user, items, clearCart]);

  const total = items.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);

  const value = { items, addItem, updateQuantity, removeItem, clearCart, checkout, total, syncBackend };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
