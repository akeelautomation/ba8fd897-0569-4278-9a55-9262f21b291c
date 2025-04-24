
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product, CartItem, Customer, Order } from "../types";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  createOrder: () => Order | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.title} إلى سلة التسوق`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const createOrder = (): Order | null => {
    if (!customer || cart.length === 0) {
      return null;
    }

    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      customer,
      items: [...cart],
      total: getTotalPrice(),
      date: new Date().toISOString(),
    };

    // In a real app, this would send the order to a backend
    // For now, we'll just console.log it
    console.log("Order created:", newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        customer,
        setCustomer,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
