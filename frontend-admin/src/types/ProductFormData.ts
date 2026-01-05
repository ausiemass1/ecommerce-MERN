export interface ProductFormData {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    imageFile?: File; // 👈 frontend-only
  }
  