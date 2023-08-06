/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillingResponse, CreateAddressComponent } from './create-address.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { BillingAddress } from 'src/app/Model/billing-address';
import { NotifyService } from 'src/app/Service/notify.service';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { of, throwError } from 'rxjs';

describe('CreateAddressComponent', () => {
  let component: CreateAddressComponent;
  let fixture: ComponentFixture<CreateAddressComponent>;
  let spyMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  let spyNotifyService = jasmine.createSpyObj<NotifyService>('NotifyService', ['success', 'warning'])
  let spyBillingAddressService = jasmine.createSpyObj<BillingAddressService>('BillingAddressService', ['createBillingAddress'])

  let billingAddress: BillingAddress =
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
  };

  const fb = new FormBuilder();
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAddressComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppModule,
        HttpClientModule,
        HttpClientTestingModule,
        MaterialModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: spyMatDialogRef },
        { provide: FormBuilder, useValue: fb },
        { provide: NotifyService, useValue: spyNotifyService },
        { provide: BillingAddressService, useValue: spyBillingAddressService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAddressComponent);
    component = fixture.componentInstance;
    component.createBillingForm = fb.group({
      billingName: ['Ramkumar', [Validators.required]],
      address1: ['2h', [Validators.required]],
      address2: ['kn', [Validators.required]],
      city: ['Tn', [Validators.required]],
      state: ['Tn', [Validators.required]],
      postalCode: [628008, [Validators.required]],
      mobileNumber: [8667585924, [Validators.required]],
      defaultAddress: [true],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCancel() method should called and check dialogRef.close is called', () => {
    component.onCancel();
    expect(spyMatDialogRef.close).toHaveBeenCalled()
  });

  it(`onSubmit() should called and expect 'createBillingForm' is valid and 
  'service.createBillingAddress' should return succeed response, then check
  'notify.success()' called with message`, () => {
    component.createBillingForm.controls['billingName'].setValue(billingAddress.billingName)
    component.createBillingForm.controls['address1'].setValue(billingAddress.address1)
    component.createBillingForm.controls['address2'].setValue(billingAddress.address2)
    component.createBillingForm.controls['city'].setValue(billingAddress.city)
    component.createBillingForm.controls['state'].setValue(billingAddress.state)
    component.createBillingForm.controls['mobileNumber'].setValue(billingAddress.mobileNumber)
    component.createBillingForm.controls['postalCode'].setValue(billingAddress.postalCode)
    component.createBillingForm.controls['defaultAddress'].setValue(billingAddress.default)



    spyBillingAddressService.createBillingAddress.and.returnValue(of({
      message: "Address added"
    } as BillingResponse))

    component.onSubmit();

    expect(component.createBillingForm.valid).toBeTruthy();
    expect(spyNotifyService.success).toHaveBeenCalledWith("Address added")
  })

  it(`onSubmit() should called and expect 'createBillingForm' is valid and 
  'service.createBillingAddress' should return HttpErrorResponse, then check
  'notify.warning()' called with message`, () => {
    component.createBillingForm.controls['billingName'].setValue(billingAddress.billingName)
    component.createBillingForm.controls['address1'].setValue(billingAddress.address1)
    component.createBillingForm.controls['address2'].setValue(billingAddress.address2)
    component.createBillingForm.controls['city'].setValue(billingAddress.city)
    component.createBillingForm.controls['state'].setValue(billingAddress.state)
    component.createBillingForm.controls['mobileNumber'].setValue(billingAddress.mobileNumber)
    component.createBillingForm.controls['postalCode'].setValue(billingAddress.postalCode)
    component.createBillingForm.controls['defaultAddress'].setValue(billingAddress.default)



    spyBillingAddressService.createBillingAddress.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'test error' } }))
    )

    component.onSubmit();

    expect(component.createBillingForm.valid).toBeTruthy();
    expect(spyNotifyService.warning).toHaveBeenCalledWith("test error")
  })
});
 