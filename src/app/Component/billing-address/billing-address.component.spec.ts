import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Rx from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material/material.module';
import { BillingAddress } from 'src/app/Model/billing-address';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { BillingAddressComponent } from './billing-address.component';
import { CreateAddressComponent } from './create-address/create-address.component';
import { DeleteAddressComponent } from './delete-address/delete-address.component';
import { UpdateAddressComponent } from './update-address/update-address.component';


describe('BillingAddressComponent', () => {
  let component: BillingAddressComponent;
  let fixture: ComponentFixture<BillingAddressComponent>;

  let service = jasmine.createSpyObj(BillingAddressService, [
    'getBillingAddress',
  ]);
  let dialog: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: Rx.of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingAddressComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientTestingModule,
        MaterialModule,
      ],
      providers: [
        { provide: BillingAddressService, useValue: service },
        MatDialog,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressComponent);
    component = fixture.componentInstance;
    service.getBillingAddress.and.returnValue(Rx.of(billingAddressList));
    dialog = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getData() should called and data fetched', () => {
    expect(component.data).toEqual(billingAddressList);
  });

  it('openDialog() should called and open CreateAddressComponent in MatDialog', () => {
    component.openDialog('create');

    expect(dialog).toHaveBeenCalledWith(CreateAddressComponent, {
      height: '600px',
      width: '800px',
      autoFocus: false,
    });

    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('openDialog() should called and open UpdateAddressComponent in MatDialog', () => {
    component.openDialog('update', 1);

    expect(dialog).toHaveBeenCalledWith(UpdateAddressComponent, {
      height: '600px',
      width: '800px',
      autoFocus: false,
      data: {
        id: 1,
      },
    });

    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('openDialog() should called and open DeleteAddressComponent in MatDialog', () => {
    component.openDialog('delete', 1);

    expect(dialog).toHaveBeenCalledWith(DeleteAddressComponent, {
      data: {
        id: 1,
      },
    });

    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });
});
