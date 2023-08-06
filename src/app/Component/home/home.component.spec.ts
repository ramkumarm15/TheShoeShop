import * as Rx from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { HomeComponent } from 'src/app/Component/home/home.component';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { ProductService } from 'src/app/Service/product.service';
import { UserService } from 'src/app/Service/user.service';
import { NotifyService } from 'src/app/Service/notify.service';
import { Cart, CartResponse } from 'src/app/Model/cart';
import { Product } from 'src/app/Model/product';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let authService = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);
  let cartService = jasmine.createSpyObj('CartService', [
    'getCart',
    'addToCart',
  ]);
  let userService = jasmine.createSpyObj('UserService', ['preferredUserName']);
  let productService = jasmine.createSpyObj('ProductService', ['getProduct']);
  let notify = jasmine.createSpyObj('NotifyService', ['success', 'info']);

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

  let productData: Product[] = [
    {
      id: 1,
      name: 'ZX 9000 A-ZX Series sneakers',
      slug: 'zx-9000-a-zx-series-sneakers',
      description: 'string',
      price: 9799.5,
      image:
        'https://res.cloudinary.com/ramkumarm15/image/upload/v1669956546/products/product_18_tsspke.jpg',
      isActive: true,
      createdAt: new Date('2023-01-11T13:43:12.247004'),
      updatedAt: new Date('2023-01-11T13:43:12.247004'),
    },
    {
      id: 2,
      name: 'ADIDAS ADIZERO SL RUNNING SHOES',
      slug: 'adidas-adizero-sl-running-shoes',
      description: 'string',
      price: 11999,
      image:
        'https://res.cloudinary.com/ramkumarm15/image/upload/v1669963988/products/adidas-adizero-sl-running-shoes_wzw4an.jpg',
      isActive: true,
      createdAt: new Date('2023-01-11T13:43:41.3216165'),
      updatedAt: new Date('2023-01-11T13:43:41.3216187'),
    },
  ];

  let cartResponse: CartResponse = {
    message: "Product added"
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: CartService, useValue: cartService },
        { provide: UserService, useValue: userService },
        { provide: ProductService, useValue: productService },
        { provide: NotifyService, useValue: notify },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance;

    productService.getProduct.and.returnValue(Rx.of(productData));

    authService.isUserLoggedIn.and.returnValue(true);

    cartService.getCart.and.returnValue(Rx.of(cartData));

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getter getPreferredName should return preferredUserName', () => {
    userService.preferredUserName = 'testtest';
    expect(component.getPreferredName).toEqual('testtest');
  });

  it(`getProducts() should call getProduct() service method, return products data and
  check fetched product details assinged to 'component.products' and 
  check changeFilter() method called with 'orderAsc'`, () => {
    spyOn(component, 'changeFilter');
    productService.getProduct.and.returnValue(Rx.of(productData));

    component.getProducts();

    expect(component.products).toBe(productData);
    expect(component.changeFilter).toHaveBeenCalledWith('orderAsc');
  });

  it(`getProducts() should call getProduct() service method, return HttpErrorResponse and
  check notify.info() method called with error message`, () => {
    productService.getProduct.and.returnValue(
      Rx.throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'test error' },
            status: 404,
          })
      )
    );

    component.getProducts();
    expect(notify.info).toHaveBeenCalledWith('test error');
  });

  it(`getCart() should call getCart() service method, return cart data and
  check cartCount value assinged`, () => {
    cartService.getCart.and.returnValue(Rx.of(cartData));
    component.getCart();

    expect(component.cartCount).toBe(cartData.cartItemsList.length);
  });

  it(`check changeFilter() call orderByAsc() method`, () => {
    spyOn(component, 'orderByAsc').and.callThrough();
    component.changeFilter('orderAsc');
    expect(component.orderByAsc).toHaveBeenCalled();
  });

  it(`check changeFilter() call orderByDesc() method`, () => {
    spyOn(component, 'orderByDesc').and.callThrough();
    component.changeFilter('orderDesc');
    expect(component.orderByDesc).toHaveBeenCalled();
  });

  it(`addToCart() should call addToCart() service method and return response
  and check notify.success() method called and component.getCart() method called`, () => {
    spyOn(component, 'getCart');
    cartService.addToCart.and.returnValue(Rx.of(cartResponse));

    component.addToCart(1);

    expect(notify.success).toHaveBeenCalledWith('Product added');
    expect(component.getCart).toHaveBeenCalled();
  });
});
