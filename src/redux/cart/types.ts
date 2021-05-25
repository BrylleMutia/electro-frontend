import { ProductInterface } from "../shop/types";
import { ErrorResponse } from "../auth/types";

export interface CartState {
  isCartOpen: boolean;
  cartItems: CartItemInterface[];
  total: number;
  orderDetails: OrderInterface | null;
  isLoading: boolean;
  error: ErrorResponse;
}

export interface OrderInterface {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  transaction_id: string;
  total: number;
  products: OrderProductsInterface[];
}

export interface MinDetailsProduct {
  id: number;
  created_at: string;
  updated_at: string;
  product_name: string;
  slug: string;
  price: string | number;
  product_image: string;
  description: string;
  seller_id: number;
  offer_id: number;
}

export interface OrderProductsInterface extends MinDetailsProduct {
  pivot: {
    order_id: number;
    product_id: number;
    quantity: number;
  };
}


export interface CartItemInterface {
  quantity: number;
  product: ProductInterface;
}
