import { ProductInterface } from "../shop/types";
import { ErrorResponse } from "../auth/types";

export interface CartState {
  isCartOpen: boolean;
  cartItems: CartItemInterface[];
  total: number;
  orderDetails: OrderWithProductsInterface | null;
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
}
export interface OrderWithProductsInterface extends OrderInterface {
  products: OrderProductsPivotInterface[];
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

export interface OrderProductsPivotInterface extends MinDetailsProduct {
  pivot: ProductsOrderPivot;
}

export interface ProductsOrderPivot {
  order_id: number;
  product_id: number;
  quantity: number;
}

export interface CartItemInterface {
  quantity: number;
  product: ProductInterface;
}
