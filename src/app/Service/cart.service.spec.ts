import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpReqInterceptor } from '../Interceptor/httpreq.interceptor';
import { CartResponse, CartPayload, CartOperations, Cart } from '../Model/cart';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let controller: HttpTestingController;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let actualCartResponse: CartResponse = {
    message: 'Product added',
  };

  const cartItemAddPayload: CartPayload = {
    data: {
      productId: 1,
      quantity: 1,
    },
    operation: CartOperations.ADD,
  };
  const cartItemUpdatePayload: CartPayload = {
    data: {
      productId: 1,
      quantity: 1,
    },
    operation: CartOperations.UPDATE,
  };
  const cartItemDeletePayload: CartPayload = {
    data: {
      productId: 1,
      quantity: 1,
    },
    operation: CartOperations.DELETE,
  };

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
      imports: [HttpClientTestingModule],
      providers: [
        CartService,
        { provide: Router, useValue: mockRouter },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpReqInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(CartService);
    controller = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    controller.verify();
  });

  it('addToCart() should make a HTTP POST request and return response', () => {
    service.addToCart(cartItemAddPayload).subscribe({
      next: (res) => {
        expect(res).toBe(actualCartResponse);
      },
    });

    let request = controller.expectOne(environment.CART_API.CART_ITEM);
    expect(request.request.method).toEqual('POST');
    request.flush(actualCartResponse);
  });

  it('updateCartItem() should make a HTTP POST request and return response', () => {
    actualCartResponse.message = 'Product updated';
    service.updateCartItem(cartItemUpdatePayload).subscribe({
      next: (res) => {
        expect(res).toBe(actualCartResponse);
      },
    });

    let request = controller.expectOne(environment.CART_API.CART_ITEM);
    expect(request.request.method).toEqual('POST');
    request.flush(actualCartResponse);
  });

  it('deleteCartItem() should make a HTTP POST request and return response', () => {
    service.deleteCartItem(cartItemDeletePayload).subscribe({
      next: (res) => {
        expect(res).toBe(actualCartResponse);
      },
    });

    let request = controller.expectOne(environment.CART_API.CART_ITEM);
    expect(request.request.method).toEqual('POST');
    request.flush(actualCartResponse);
  });

  it('getCart() should make a HTTP GET request and return response', () => {
    service.getCart().subscribe({
      next: (res) => {
        expect(res).toBe(cartData);
      },
    });

    let request = controller.expectOne(environment.CART_API.CART);
    expect(request.request.method).toEqual('GET');
    request.flush(cartData);
  });

  it('get and set cartData() should initilize value and return value', () => {
    service.cartData = cartData;
    expect(service.cartData).toBe(cartData);
  });

  it('get and set cartCount() should initilize value and return value', () => {
    service.cartCount = cartData.cartItemsList.length;
    expect(service.cartCount).toEqual(1);
  });
});
