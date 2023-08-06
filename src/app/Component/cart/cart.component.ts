import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import {
  Cart,
  CartOperations,
  CartPayload,
  CartResponse,
} from '../../Model/cart';
import { Title } from '@angular/platform-browser';
import { NotifyService } from '../../Service/notify.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  pageTitle: string = 'Cart | Online Shopping for Men & Women Shoes';
  cartOfUser!: Cart;
  cartQty: any = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ];

  loading: boolean = true;

  constructor(
    private documentTitle: Title,
    private notify: NotifyService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);
    this.getCartData();
  }

  getCartData() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (response: Cart) => {
        console.log(response);
        this.cartOfUser = response;
        this.cartService.cartData = response;
        this.loading = false;
      },
    });
  }

  updateCart(productId: number, qty: number) {
    const payload: CartPayload = {
      data: {
        productId,
        quantity: qty,
      },
      operation: CartOperations.UPDATE,
    };
    this.cartService.updateCartItem(payload).subscribe({
      next: (response: CartResponse) => {
        this.getCartData();
        this.notify.success(response.message);
      },
    });
  }

  deleteCart(productId: number) {
    const payload: CartPayload = {
      data: {
        productId,
        quantity: 0,
      },
      operation: CartOperations.DELETE,
    };
    this.cartService.deleteCartItem(payload).subscribe({
      next: (response: CartResponse) => {
        this.notify.success(response.message);
        this.getCartData();
      },
    });
  }
}
