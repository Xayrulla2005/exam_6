// wishlist.dto.ts

export interface AddToWishlistDTO {
  productId: number;
}

export interface WishlistItemResponseDTO {
  id: number;
  productId: number;
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl?: string;
  };
}

export interface WishlistResponseDTO {
  userId: number;
  items: WishlistItemResponseDTO[];
}
