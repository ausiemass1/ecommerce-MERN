// types/cart.ts
export interface CartItem {
    image: any;
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
  