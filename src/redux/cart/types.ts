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
  user_id: number;
  transaction_id: string;
  total: number;
  updated_at: string;
  created_at: string;
  products: OrderProductsInterface[];
}

export interface OrderProductsInterface extends ProductInterface {
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
