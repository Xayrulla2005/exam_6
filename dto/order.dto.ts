// order.dto.ts

export interface OrderItemDTO {
  productId: number;
  quantity: number;
}

export interface CreateOrderDTO {
  items: OrderItemDTO[];
}

export interface CheckoutOrderDTO {
  fullName: string;
  address: string;
  phone: string;
  paymentType: string; // e.g., "cash" | "card"
}

export interface OrderItemResponseDTO {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl?: string;
  };
}

export interface OrderResponseDTO {
  id: number;
  userId: number;
  status: string;
  totalPrice: number;
  items: OrderItemResponseDTO[];
  createdAt: string;
  updatedAt: string;
}
