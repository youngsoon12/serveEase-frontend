'use client';

import { useState } from 'react';

interface CartItem {
  menuId: number;
  name: string;
  price: number;
  quantity: number;
}

export default function useOrderCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (menu: { id: number; name: string; price: number }) =>
    setCartItems((prevItems) => {
      const foundIndex = prevItems.findIndex((item) => item.menuId === menu.id);

      // 이미 있으면 수량만 +1
      if (foundIndex >= 0) {
        const updated = [...prevItems];

        updated[foundIndex] = {
          ...updated[foundIndex],
          quantity: updated[foundIndex].quantity + 1,
        };

        return updated;
      }

      // 없으면 새로 추가
      return [
        ...prevItems,
        { menuId: menu.id, name: menu.name, price: menu.price, quantity: 1 },
      ];
    });

  const increaseQuantity = (menuId: number) =>
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.menuId === menuId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );

  const decreaseQuantity = (menuId: number) =>
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.menuId === menuId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );

  const removeItem = (menuId: number) =>
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.menuId !== menuId),
    );

  const clearCart = () => setCartItems([]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const toOrderItems = () =>
    cartItems.map((item) => ({
      menuId: item.menuId,
      quantity: item.quantity,
    }));

  return {
    cartItems,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
    toOrderItems,
  };
}
