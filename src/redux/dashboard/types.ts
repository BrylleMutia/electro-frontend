import type { MinDetailsProduct, OrderInterface, ProductsOrderPivot, StatusInterface, OrderWithProductsInterface } from "../cart/types";
import type { UserDetails, ErrorResponse } from "../auth/types";
import type { ProductCategoryInterface } from "../shop/types";

export interface DashboardState {
  sellerProducts: ProductsWithOrderInterface[];
  productOrders: OrderWithUserProductsAndStatusInterface[],
  isLoading: boolean;
  error: ErrorResponse;
}

export interface ProductsWithOrderInterface extends MinDetailsProduct {
  orders: OrderWithUserAndStatusPivot[];
  categories: ProductCategoryInterface[];
}

export interface OrderWithUserAndStatusPivot extends OrderInterface {
  user: UserWithStripeDetails;
  pivot: ProductsOrderPivot;
}
export interface OrderWithUserProductsAndStatusInterface extends OrderWithProductsInterface {
  user: UserWithStripeDetails;
  pivot: SellerOrdersPivot;
}

export interface SellerOrdersPivot {
  seller_id: number;
  order_id: number;
}

export interface UserWithStripeDetails extends UserDetails {
  stripe_id: string;
  card_brand: string | null;
  card_last_four: string | null;
  trial_ends_at: string | null;
}
