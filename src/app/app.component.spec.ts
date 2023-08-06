// app.component.spec.ts
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { Cart } from './Model/cart';
import { AuthService } from './Service/auth.service';
import { CartService } from './Service/cart.service';
import { UserService } from './Service/user.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let spyAuthService = jasmine.createSpyObj<AuthService>('AuthService', [
    'isUserLoggedIn',
    'getUserToken',
  ]);
  let spyCartService = jasmine.createSpyObj<CartService>('CartService', [
    'getCart',
  ]);
  let spyUserService = jasmine.createSpyObj<UserService>('UserService', [
    'preferredUserName',
    'id',
  ]);

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicmFta3VtYXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJSYW1rdW1hciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjc0NDU4NDcyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzIzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0NDMyMyJ9.LQSu2tqbzuozMy69wY9XFLkEKkaOYj5-BN_kaHzaqps';

  let cartData: Cart = {
    cartID: 1,
    totalPrice: 11999,
    created: new Date('2023-01-11T13:07:31.2785798'),
    updated: new Date('2023-01-19T21:34:04.5162383'),
    userID: 1,
    cartItemsList: [
      {
        cartItemsID: 1,
        product: {
          id: 3,
          name: 'FORUM 84 HOME ALONE 2',
          slug: 'forum-84-home-alone-2forum-84-home-alone-2',
          description: 'string',
          price: 11999,
          image:
            'https://res.cloudinary.com/ramkumarm15/image/upload/v1670317661/products/Forum_84_Home_Alone_2_Grey_ID4328_01_standard_cz9jwd.jpg',
          isActive: true,
          createdAt: new Date('2023-01-11T13:44:03.867866'),
          updatedAt: new Date('2023-01-11T13:44:03.8678676'),
        },
        quantity: 1,
        totalPrice: 11999,
      },
    ],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CommonModule, AppModule],
      providers: [
        { provide: AuthService, useValue: spyAuthService },
        { provide: CartService, useValue: spyCartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    spyAuthService.getUserToken.and.returnValue(token);

    spyUserService.preferredUserName = 'Ramkumar';
    spyUserService.id = 2;

    spyAuthService.isUserLoggedIn = true;
    spyCartService.getCart.and.returnValue(of(cartData));
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`getCart() should called and expect 'service.getCart' should 
  return cart data, then check cartCount`, () => {
    spyCartService.getCart.and.returnValue(of(cartData));
    component.getCart();
    expect(component.cartCount).toEqual(1);
  });
});
