export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    sizes: {
      label: string;
      value: string;
    }[];
    category?: string;
  }
  