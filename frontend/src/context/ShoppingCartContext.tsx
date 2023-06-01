import React, { ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import notifyService from "../services/notify.service";

type ShoppingCartContextType = {
  cartItemsQuantity: number;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  getItemCount: () => number;
  buyProducts: () => void;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  removeItemFromCart: (id: string) => void;
};

type CartItem = {
  id: string;
  quantity: number;
};

const ShoppingCartContext = React.createContext<
  ShoppingCartContextType | undefined
>(undefined);

type ShoppingCartProviderProps = {
  children: ReactNode;
};

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const getItemQuantity = (id: string) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const getItemCount = () => {
    return cartItems.length;
  };

  const buyProducts = () => {
    setCartItems([]);
    closeCart();
    notifyService.showSuccessNotification("Order will send ASAP!");
  };

  const increaseItemQuantity = (id: string) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { id, quantity: 1 }];
      }
    });
    notifyService.showSuccessNotification("added to cart");
  };

  const decreaseItemQuantity = (id: string) => {
    setCartItems((prevCartItems) => {
      return prevCartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
    notifyService.showSuccessNotification("removed from cart");
  };

  const removeItemFromCart = (id: string) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== id);
    });
    notifyService.showSuccessNotification("removed from cart");
  };

  const cartItemsQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const contextValue: ShoppingCartContextType = {
    cartItemsQuantity,
    cartItems,
    openCart,
    closeCart,
    buyProducts,
    getItemQuantity,
    getItemCount,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
      <ShoppingCart isOpen={isCartOpen} />
    </ShoppingCartContext.Provider>
  );
};

const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCartContext must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export { ShoppingCartContext, ShoppingCartProvider, useShoppingCartContext };
