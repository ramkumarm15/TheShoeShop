import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BillingResponse } from '../Component/billing-address/create-address/create-address.component';
import { HttpReqInterceptor } from '../Interceptor/httpreq.interceptor';
import { BillingAddress } from '../Model/billing-address';
import { BillingAddressService } from './billing-address.service';

describe('BillingAddressService', () => {
  let service: BillingAddressService;
  let controller: HttpTestingController;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  let billingAddressList: BillingAddress[] = [
    {
      id: 1,
      billingName: 'Ramkumar',
      address1: 'test',
      address2: 'test',
      city: 'test',
      state: 'test',
      mobileNumber: 123456789,
      postalCode: 123456,
      default: false,
    },
  ];

  let billingAddressResponse: BillingResponse = {
    message: 'Address added',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        BillingAddressService,
        { provide: Router, useValue: mockRouter },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpReqInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(BillingAddressService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('getBillingAddress() should make a HTTP GET request and then return response', () => {
    service.getBillingAddress().subscribe({
      next: (res) => {
        expect(res).toEqual(billingAddressList);
      },
    });

    const req = controller.expectOne(environment.BILLING_ADDRESS_API);
    expect(req.request.method).toEqual('GET');
    req.flush(billingAddressList);
  });

  it('getBillingAddressById() should make a HTTP GET request and then return response', () => {
    service.getBillingAddressById(1).subscribe({
      next: (res) => {
        expect(res).toEqual(billingAddressList[0]);
      },
    });

    const req = controller.expectOne(environment.BILLING_ADDRESS_API + '/1');

    expect(req.request.method).toEqual('GET');
    req.flush(billingAddressList[0]);
  });

  it('createBillingAddress() should make a HTTP POST request and then return response', () => {
    service.createBillingAddress(billingAddressList[0]).subscribe({
      next: (res) => {
        expect(res).toEqual(billingAddressResponse);
      },
    });

    const req = controller.expectOne(environment.BILLING_ADDRESS_API);

    expect(req.request.method).toEqual('POST');
    req.flush(billingAddressResponse);
  });

  it('updateBillingAddress() should make a HTTP PUT request and then return response', () => {
    billingAddressResponse.message = 'Address updated';
    service.updateBillingAddress(1, billingAddressList[0]).subscribe({
      next: (res) => {
        expect(res).toEqual(billingAddressResponse);
      },
    });

    const req = controller.expectOne(environment.BILLING_ADDRESS_API + '/1');

    expect(req.request.method).toEqual('PUT');
    req.flush(billingAddressResponse);
  });

  it('deleteBillingAddress() should make a HTTP DELETE request and then return response', () => {
    billingAddressResponse.message = 'Address deleted';
    service.deleteBillingAddress(1).subscribe({
      next: (res) => {
        expect(res).toEqual(billingAddressResponse);
      },
    });

    const req = controller.expectOne(environment.BILLING_ADDRESS_API + '/1');

    expect(req.request.method).toEqual('DELETE');
    req.flush(billingAddressResponse);
  });
});
