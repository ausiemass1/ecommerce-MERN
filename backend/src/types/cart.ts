// types/cart.ts
export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface Cart {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
  }
  