import type { MinDetailsProduct, OrderInterface, ProductsOrderPivot } from "../cart/types";
import type { UserDetails, ErrorResponse } from "../auth/types";
import type { ProductCategoryInterface } from "../shop/types";

export interface DashboardState {
  sellerProducts: ProductsWithOrderInterface[];
  isLoading: boolean;
  error: ErrorResponse;
}

export interface ProductsWithOrderInterface extends MinDetailsProduct {
  orders: ProductsWithOrderAndUserInterface[];
  categories: ProductCategoryInterface[];
}

export interface ProductsWithOrderAndUserInterface extends OrderInterface {
  pivot: ProductsOrderPivot;
  user: UserWithStripeDetails;
}

export interface UserWithStripeDetails extends UserDetails {
  stripe_id: string;
  card_brand: string | null;
  card_last_four: string | null;
  trial_ends_at: string | null;
}
