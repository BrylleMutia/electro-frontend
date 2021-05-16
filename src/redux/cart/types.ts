import { ProductInterface } from "../shop/types";

export interface CartState {
  isCartOpen: boolean,
  cartItems: CartItemInterface[]
}

export interface CartItemInterface {
  quantity: number,
  product: ProductInterface
}