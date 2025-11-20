const STORAGE_KEY = 'pgs_cart_v1';

export function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart({ id, title, price }) {
  if (id == null || title == null || price == null) return;
  const cart = getCart();
  const existing = cart.find(p => p.id === id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ id, title, price: Number(price), quantity: 1 });
  }
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}
