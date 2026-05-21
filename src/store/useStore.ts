import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  message?: string; // Birthday message
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'baking' | 'delivering' | 'delivered';
  date: string;
}

interface StoreState {
  cart: CartItem[];
  orders: Order[];
  birthday: string | null;
  addToCart: (product: Product, message?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
  setBirthday: (date: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  orders: [],
  birthday: null,
  addToCart: (product, message) => set((state) => {
    const existing = state.cart.find((item) => item.id === product.id && item.message === message);
    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id && item.message === message
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1, message }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    ),
  })),
  clearCart: () => set({ cart: [] }),
  placeOrder: () => {
    const { cart, orders } = get();
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending',
      date: new Date().toISOString(),
    };
    set({ orders: [newOrder, ...orders], cart: [] });
  },
  setBirthday: (date) => set({ birthday: date }),
}));
