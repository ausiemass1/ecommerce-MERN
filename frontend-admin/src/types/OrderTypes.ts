
// export interface OrderItem {
//     productId: string;
//     name: string;
//     quantity: number;
//     price: number;
//   }
  
//   export interface Order {
//     _id: string;
//     sessionId: string;
//     paymentIntentId: string;
//     customerEmail: string;
//     customerName: string;
//     items: OrderItem[];
//     currency: string;
//     amount_total: number;
//     amount_subtotal: number;
//     payment_status: "paid" | "unpaid" | "failed" | "refunded";
//     createdAt: string;
//   }
  

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    _id: string;
    customerName: string;
    customerEmail: string;
    items: OrderItem[];
    amount_total: number;
    payment_status: string;
    createdAt: string;
  }
  