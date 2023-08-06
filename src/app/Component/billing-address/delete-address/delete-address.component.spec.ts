/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material/material.module';
import { DeleteAddressComponent } from './delete-address.component';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { NotifyService } from 'src/app/Service/notify.service';
import { of, throwError } from 'rxjs';
import { BillingResponse } from '../create-address/create-address.component';


describe('DeleteAddressComponent', () => {
  let component: DeleteAddressComponent;
  let fixture: ComponentFixture<DeleteAddressComponent>;

  let spyMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close'])
  let spyBillingAddressService = jasmine.createSpyObj<BillingAddressService>('BillingAddressService', ['deleteBillingAddress'])
  let spyNotifyService = jasmine.createSpyObj<NotifyService>('NotifyService', ['success', 'warning']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAddressComponent],
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
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
        { provide: BillingAddressService, useValue: spyBillingAddressService },
        { provide: NotifyService, useValue: spyNotifyService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCancel() method should called and check dialogRef.close is called', () => {
    component.onCancel();
    expect(spyMatDialogRef.close).toHaveBeenCalled()
  });

  it(`check id injected from 'MAT_DIALOG_DATA'`, () => {
    expect(component.data.id).toEqual(1);
  })

  it(`onSubmit() should called and 'service.deleteBillingAddress' should 
  return succeed response, then check 'notify.success()' called 
  with message`, () => {

    spyBillingAddressService.deleteBillingAddress.and.returnValue(of({
      message: "Address deleted"
    } as BillingResponse))

    spyOn(component, 'onCancel')
    component.onSubmit();

    expect(spyNotifyService.success).toHaveBeenCalledWith("Address deleted");
    expect(component.onCancel).toHaveBeenCalledTimes(1)
  })

  it(`onSubmit() should called and 'service.deleteBillingAddress' should 
  return HttpErrorResponse, then check 'notify.warning()' called 
  with message`, () => {

    spyBillingAddressService.deleteBillingAddress.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'test error' } }))
    )
    component.onSubmit();

    expect(spyNotifyService.warning).toHaveBeenCalledWith("test error")

  })
});
