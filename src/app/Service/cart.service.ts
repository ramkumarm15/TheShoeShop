import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cart, CartPayload, CartResponse } from '../Model/cart';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CART_API: string = environment.CART_API.CART;
  private CART_ITEM: string = environment.CART_API.CART_ITEM;

  private _cartData!: Cart;

  public cartDataChange: Subject<Cart> = new Subject<Cart>();

  private _cartCount: number = 0;

  constructor(private http: HttpClient) {
    this.cartDataChange.subscribe((value) => {
      this._cartData = value;
    });
  }

  /**
   * Send Request to Cart API for add cart item
   * @param payload
   */
  addToCart(payload: CartPayload): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.CART_ITEM}`, payload);
  }

  /**
   * Send Request to Cart API for update cart item
   * @param payload
   */
  updateCartItem(payload: CartPayload): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.CART_ITEM}`, payload);
  }

  /**
   * Send Request to Cart API for delete cart item
   * @param payload
   */
  deleteCartItem(payload: CartPayload): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.CART_ITEM}`, payload);
  }

  /**
   * Send Request to Cart API for get cart data of user
   */
  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.CART_API}`);
  }

  public get cartData(): Cart {
    return this._cartData;
  }
  public set cartData(value: Cart) {
    this.cartDataChange.next(value);
  }

  public get cartCount(): number {
    return this._cartCount;
  }
  public set cartCount(value: number) {
    this._cartCount = value;
  }
  
}
