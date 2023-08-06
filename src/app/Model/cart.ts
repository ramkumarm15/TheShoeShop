import { Product } from './product';

export interface Cart {
  cartID: number;
  totalPrice: number;
  created: Date;
  updated: Date;
  userID: number;
  cartItemsList: CartItemsList[];
}

export interface CartItemsList {
  cartItemsID: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export enum CartOperations {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface CartPayload {
  data: CartItemDetail;
  operation: CartOperations;
}

export interface CartItemDetail {
  productId: number;
  quantity: number;
}

export interface CartResponse {
  message: string;
}
