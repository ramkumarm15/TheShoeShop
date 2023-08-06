import { Component, OnInit } from '@angular/core';
import { Cart } from './Model/cart';
import { AuthService } from './Service/auth.service';
import { CartService } from './Service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  /**
   * Constructor
   * @param auth
   * @param cartService
   */
  constructor(private auth: AuthService, private cartService: CartService) {}

  IsLoggedIn: boolean = this.auth.isUserLoggedIn;
  cartCount: number = 0;

  ngOnInit(): void {
    console.log(this.IsLoggedIn);
    if (this.IsLoggedIn) {
      this.getCart();
    }
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (response: Cart) => {
        this.cartService.cartData = response;
        this.cartService.cartCount = response.cartItemsList.length;
        this.cartCount = response.cartItemsList.length;
      },
    });
  }
}
