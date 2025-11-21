// product.dto.ts

export interface CreateProductDTO {
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  category: string;
}

export interface UpdateProductDTO {
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  imageUrl?: string;
  category?: string;
}

export interface ProductResponseDTO {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  category: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}
