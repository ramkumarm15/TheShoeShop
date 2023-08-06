import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = '';
  id: number = 0;

  constructor(
    private user: UserService,
    private auth: AuthService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
  }

  
  get getPreferredName(): string {
    return this.user.preferredUserName;
  }

  get authCheck(): boolean {
    return this.auth.isUserLoggedIn;
  }

  get cartItemCount(): number {
    return this.cart.cartData.cartItemsList.length;
  }

  logout(): void {
    this.auth.logout();
  }
}
