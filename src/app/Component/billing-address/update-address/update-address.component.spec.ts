/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { UpdateAddressComponent } from 'src/app/Component/billing-address/update-address/update-address.component';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { of, throwError } from 'rxjs';
import { BillingAddress } from 'src/app/Model/billing-address';
import { NotifyService } from 'src/app/Service/notify.service';
import { BillingResponse } from '../create-address/create-address.component';

describe('UpdateAddressComponent', () => {
  let component: UpdateAddressComponent;
  let fixture: ComponentFixture<UpdateAddressComponent>;
  const fb = new FormBuilder();
  let spyMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  let spyBillingAddressService = jasmine.createSpyObj<BillingAddressService>(
    'BillingAddressService',
    ['getBillingAddressById', 'updateBillingAddress']
  );
  let spyNotifyService = jasmine.createSpyObj<NotifyService>('NotifyService', [
    'success',
    'warning',
  ]);

  let billingAddress: BillingAddress = {
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAddressComponent],
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
        { provide: FormBuilder, useValue: fb },
        { provide: MatDialogRef, useValue: spyMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
        { provide: BillingAddressService, useValue: spyBillingAddressService },
        { provide: NotifyService, useValue: spyNotifyService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddressComponent);
    component = fixture.componentInstance;
    spyBillingAddressService.getBillingAddressById.and.returnValue(
      of(billingAddress)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCancel() method should called and check dialogRef.close is called', () => {
    component.onCancel();
    expect(spyMatDialogRef.close).toHaveBeenCalled();
  });

  it(`check id injected from 'MAT_DIALOG_DATA'`, () => {
    expect(component.data.id).toEqual(1);
  });

  it(`getAddress() should called and expect 'service.getBillingAddressById' 
  should return data`, () => {
    spyOn(component, 'setFormData');
    spyBillingAddressService.getBillingAddressById.and.returnValue(
      of(billingAddress)
    );
    component.getAddress();
    expect(component.address).toEqual(billingAddress);
    expect(component.setFormData).toHaveBeenCalled();
  });

  it(`getAddress() should called and expect 'service.getBillingAddressById' 
  should return HttpErrorResponse`, () => {
    spyOn(component, 'onCancel');
    spyBillingAddressService.getBillingAddressById.and.returnValue(
      throwError(
        () => new HttpErrorResponse({ error: { message: 'test error' } })
      )
    );
    component.getAddress();
    expect(spyNotifyService.warning).toHaveBeenCalledWith('test error');
    expect(component.onCancel).toHaveBeenCalled();
  });

  it(`setFormData() should called and setValue to form controls and expect
  'updateBillingForm' is valid`, () => {
    component.address = billingAddress;
    component.setFormData();
    console.log(component.updateBillingForm);
    expect(component.updateBillingForm.valid).toBeTruthy();
  });

  it(`onSubmit() should called and expect 'updateBillingForm' is valid and 
  'service.createBillingAddress' should return succeed response, then check
  'notify.success()' called with message`, () => {
    component.updateBillingForm.controls['billingName'].setValue(
      billingAddress.billingName
    );
    component.updateBillingForm.controls['address1'].setValue(
      billingAddress.address1
    );
    component.updateBillingForm.controls['address2'].setValue(
      billingAddress.address2
    );
    component.updateBillingForm.controls['city'].setValue(billingAddress.city);
    component.updateBillingForm.controls['state'].setValue(
      billingAddress.state
    );
    component.updateBillingForm.controls['mobileNumber'].setValue(
      billingAddress.mobileNumber
    );
    component.updateBillingForm.controls['postalCode'].setValue(
      billingAddress.postalCode
    );
    component.updateBillingForm.controls['defaultAddress'].setValue(
      billingAddress.default
    );

    spyBillingAddressService.updateBillingAddress.and.returnValue(
      of({
        message: 'Address updated',
      } as BillingResponse)
    );

    component.onSubmit();

    expect(component.updateBillingForm.valid).toBeTruthy();
    expect(spyNotifyService.success).toHaveBeenCalledWith('Address updated');
  });

  it(`onSubmit() should called and expect 'updateBillingForm' is valid and 
  'service.createBillingAddress' should return HttpErrorResponse, then check
  'notify.warning()' called with message`, () => {
    component.updateBillingForm.controls['billingName'].setValue(
      billingAddress.billingName
    );
    component.updateBillingForm.controls['address1'].setValue(
      billingAddress.address1
    );
    component.updateBillingForm.controls['address2'].setValue(
      billingAddress.address2
    );
    component.updateBillingForm.controls['city'].setValue(billingAddress.city);
    component.updateBillingForm.controls['state'].setValue(
      billingAddress.state
    );
    component.updateBillingForm.controls['mobileNumber'].setValue(
      billingAddress.mobileNumber
    );
    component.updateBillingForm.controls['postalCode'].setValue(
      billingAddress.postalCode
    );
    component.updateBillingForm.controls['defaultAddress'].setValue(
      billingAddress.default
    );

    spyBillingAddressService.updateBillingAddress.and.returnValue(
      throwError(
        () => new HttpErrorResponse({ error: { message: 'test error' } })
      )
    );

    component.onSubmit();

    expect(component.updateBillingForm.valid).toBeTruthy();
    expect(spyNotifyService.warning).toHaveBeenCalledWith('test error');
  });
});
