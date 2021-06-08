import type { MinDetailsProduct, OrderInterface } from "../cart/types";
import type { UserDetails, ErrorResponse } from "../auth/types";

export interface DashboardState {
  sellerProducts: ProductsWithOrderInterface[];
  isLoading: boolean;
  error: ErrorResponse;
}

export interface ProductsWithOrderInterface extends MinDetailsProduct {
  orders: ProductsWithOrderAndUserInterface[];
}

export interface ProductsWithOrderAndUserInterface extends OrderInterface {
  pivot: ProductsOrderPivot;
  user: UserWithStripeDetails;
}

export interface ProductsOrderPivot {
  order_id: number;
  product_id: number;
  quantity: number;
}

export interface UserWithStripeDetails extends UserDetails {
  stripe_id: string;
  card_brand: string | null;
  card_last_four: string | null;
  trial_ends_at: string | null;
}
