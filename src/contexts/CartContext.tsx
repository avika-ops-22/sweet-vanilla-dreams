import React, { createContext, useContext, useState, useCallback } from "react";
import { Cake } from "@/data/cakes";

export interface CartItem {
  cake: Cake;
  quantity: number;
  customMessage?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (cake: Cake, quantity?: number) => void;
  removeFromCart: (cakeId: number) => void;
  updateQuantity: (cakeId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountApplied: boolean;
  applyDiscount: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const addToCart = useCallback((cake: Cake, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.cake.id === cake.id);
      if (existing) {
        return prev.map(item =>
          item.cake.id === cake.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { cake, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((cakeId: number) => {
    setItems(prev => prev.filter(item => item.cake.id !== cakeId));
  }, []);

  const updateQuantity = useCallback((cakeId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.cake.id !== cakeId));
      return;
    }
    setItems(prev =>
      prev.map(item => (item.cake.id === cakeId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountApplied(false);
    setDiscountCode("");
  }, []);

  const applyDiscount = useCallback(() => {
    if (discountCode.toUpperCase() === "SWEET10") {
      setDiscountApplied(true);
      return true;
    }
    return false;
  }, [discountCode]);

  const subtotal = items.reduce((sum, item) => sum + item.cake.price * item.quantity, 0);
  const totalPrice = discountApplied ? subtotal * 0.9 : subtotal;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems, discountCode, setDiscountCode, discountApplied, applyDiscount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
