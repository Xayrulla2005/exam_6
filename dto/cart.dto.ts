// cart.dto.ts

export interface AddToCartDTO {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDTO {
  quantity: number;
}

export interface CartItemResponseDTO {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl?: string;
  };
}

export interface CartResponseDTO {
  userId: number;
  items: CartItemResponseDTO[];
  totalPrice: number;
}
