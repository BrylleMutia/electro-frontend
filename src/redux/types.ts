// ------------- AUTH TYPES
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: UserType | null;
  userDetails: UserDetails | null;
  error: ErrorResponse;
}

export interface UserDetails {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  image: string;
  email_verified_at: string | null;
  address: string | null;
  barangay: string;
  city: string;
  province: string;
  zip_code: string;
  role_id: number;
}

export type UserType = "buyer" | "seller";

export interface ErrorResponse {
  message: string;
  errors: {
    [index: string]: string[];
  };
}

export interface AuthResponse {
  user: UserDetails;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

// ------------ SHOP TYPES
export interface ShopState {
  products: ProductInterface[],
  offers: GroupedProductsInterface,
  categories: GroupedProductsInterface,
  sellers: UserDetails[] | null,
  isLoading: boolean,
  error: ErrorResponse
}

export interface ProductInterface {
  id: string;
  created_at: string;
  updated_at: string;
  product_name: string;
  slug: string;
  price: string | number;
  product_image: string;
  description: string;
  categories: CategoryInterface[];
  seller_id: number;
  seller: UserDetails;
  offer_id: number;
  offer: OfferInterface
}

export interface GroupedProductsInterface {
  [index: string]: ProductInterface[];
}

export interface OfferInterface {
  id: number;
  created_at: string;
  updated_at: string;
  offer_title: string;
}

export interface CategoryInterface {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    category_id: number;
  };
}