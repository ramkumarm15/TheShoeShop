import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpReqInterceptor } from '../Interceptor/httpreq.interceptor';
import { Product } from '../Model/product';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let controller: HttpTestingController;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let productList: Product[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ProductService,
        { provide: Router, useValue: routerSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpReqInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(ProductService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('getProduct() should make a HTTP GET request and then return response', () => {
    service.getProduct().subscribe({
      next: (res) => {
        expect(res).toBe(productList);
      },
    });

    const req = controller.expectOne(environment.PRODUCT_API);
    expect(req.request.method).toBe('GET');
    req.flush(productList);
  });
});
