import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import * as RX from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material/material.module';
import { Cart, CartResponse } from 'src/app/Model/cart';
import { CartService } from 'src/app/Service/cart.service';
import { NotifyService } from 'src/app/Service/notify.service';
import { CartComponent } from './cart.component';


describe('CartComponet', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let cartService = jasmine.createSpyObj('CartService', [
    'getCart',
    'updateCartItem',
    'deleteCartItem',
  ]);
  let notify = jasmine.createSpyObj('NotifyService', ['success']);

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
      declarations: [CartComponent],
      imports: [
        CommonModule,
        MaterialModule,
        AppModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [
        { provide: CartService, useValue: cartService },
        { provide: NotifyService, useValue: notify },
      ],
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    cartService.getCart.and.returnValue(RX.of(cartData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateCart() should call and make service call with success status', () => {
    const productId: number = 1
    const qty: number = 1;

    cartService.updateCartItem.and.returnValue(
      RX.of({
        message: 'Product updated in cart',
      } as CartResponse)
    );

    component.updateCart(productId, qty);

    expect(notify.success).toHaveBeenCalledWith('Product updated in cart');
  });

  it('deleteCart() should call and make service call with failed status', () => {
    const productId: number = 1;

    cartService.deleteCartItem.and.returnValue(
      RX.of({
        message: 'Product deleted from cart',
      } as CartResponse)
    );

    component.deleteCart(productId);

    expect(notify.success).toHaveBeenCalledWith('Product deleted from cart');
  });
});
