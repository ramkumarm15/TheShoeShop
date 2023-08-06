import * as Rx from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { UserService } from 'src/app/Service/user.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  // let authService = jasmine.createSpyObj('AuthService', [
  //   'isUserLoggedIn',
  //   'logout',
  //   'getUserToken',
  // ]);

  let authService = jasmine.createSpyObj('AuthService', ['isUserLoggedIn', 'logout']);
  let cartService = jasmine.createSpyObj('CartService', ['cartData']);
  let userService = jasmine.createSpyObj('UserService', [
    'preferredUserName',
    'id',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [CommonModule, AppModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: CartService, useValue: cartService },
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    userService.preferredUserName = 'Ramkumar';

    userService.id = 2;

    authService.isUserLoggedIn = true;

    cartService.cartData = {
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
    };;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getter getPreferredName should return user name', () => {
    expect(component.getPreferredName).toEqual('Ramkumar');
  });

  it('getter authCheck should return user name', () => {
    expect(component.authCheck).toEqual(true);
  });

  it('getter authCheck should return user name', () => {
    expect(component.cartItemCount).toEqual(1);
  });

  it('logout() should call logut() service method', () => {
    component.logout()
    expect(authService.logout).toHaveBeenCalled();
  });
});
