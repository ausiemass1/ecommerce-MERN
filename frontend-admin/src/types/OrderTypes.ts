
// export interface OrderItem {
//     name: string;
//     quantity: number;
//     price: number;
//   }
  
//   export interface Order {
//     _id: string;
//     customerName: string;
//     customerEmail: string;
//     items: OrderItem[];
//     amount_total: number;
//     payment_status: string;
//     createdAt: string;
//   }

export interface OrderItem {
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  currency: string;
}

export interface ShippingAddress {
  name?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

export interface Order {
  _id: string;
  customerName?: string;
  customerEmail?: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  items: OrderItem[];
  shipping?: ShippingAddress | null;
  createdAt: string;
}

  


