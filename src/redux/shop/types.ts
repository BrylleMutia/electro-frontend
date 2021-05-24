import type { UserDetails, ErrorResponse } from "../auth/types";

export interface ShopState {
  products: ProductInterface[];
  offers: GroupedProductsInterface;
  categories: GroupedProductsInterface;
  sellers: UserDetails[] | null;
  currentProduct: ProductDetailsInterface;
  searchResults: ProductInterface[]
  isLoading: boolean;
  error: ErrorResponse;
}

export interface ProductInterface {
  id: number;
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
  offer: OfferInterface;
}

export interface ProductDetailsInterface extends ProductInterface {
  reviews: ReviewInterface[] | null;
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

export interface ReviewInterface {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  rating: number;
  feedback: string;
  user_id: number;
  user: UserDetails;
}
