export interface ProductInterface {
  id: string;
  created_at: string;
  updated_at: string;
  product_name: string;
  price: string | number;
  seller_id: number;
  category: number;
  description: string;
  product_image: string[];
  offer_id: number;
}

export interface OfferInterface {
  id: number;
  created_at: string;
  updated_at: string;
  offer_title: string;
  products: ProductInterface[];
  offer_id: number;
}
