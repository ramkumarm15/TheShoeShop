import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingAddress } from 'src/app/Model/billing-address';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { NotifyService } from 'src/app/Service/notify.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
})
export class UpdateAddressComponent implements OnInit, AfterViewInit {
  address!: BillingAddress;

  constructor(
    private fb: FormBuilder,
    private service: BillingAddressService,
    private notify: NotifyService,
    public dialogRef: MatDialogRef<UpdateAddressComponent>,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  updateBillingForm!: FormGroup;
  ngOnInit(): void {
    this.getAddress();
    this.updateBillingForm = this.fb.group({
      billingName: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: [
        '',
        [Validators.required],
      ],
      mobileNumber: [
        '',
        [
          Validators.required,
        ],
      ],
      defaultAddress: [false],
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  getAddress() {
    this.service.getBillingAddressById(this.data.id).subscribe({
      next: (response: BillingAddress) => {
        this.address = response;
        this.setFormData();
      },
      error: (err: HttpErrorResponse) => {
        this.notify.warning(err.error.message);
        this.onCancel();
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  setFormData() {
    this.updateBillingForm.controls['billingName'].setValue(this.address.billingName);
    this.updateBillingForm.controls['address1'].setValue(this.address.address1);
    this.updateBillingForm.controls['address2'].setValue(this.address.address2);
    this.updateBillingForm.controls['city'].setValue(this.address.city);
    this.updateBillingForm.controls['state'].setValue(this.address.state);
    this.updateBillingForm.controls['postalCode'].setValue(this.address.postalCode);
    this.updateBillingForm.controls['mobileNumber'].setValue(this.address.mobileNumber);
    this.updateBillingForm.controls['defaultAddress'].setValue(this.address.default);
    this.updateBillingForm.controls['defaultAddress'].clearValidators();
    this.updateBillingForm.controls['defaultAddress'].updateValueAndValidity();
  }

  onSubmit() {
    this.updateBillingForm.controls['defaultAddress'].clearValidators()
    this.updateBillingForm.controls['defaultAddress'].updateValueAndValidity();
    if (this.updateBillingForm.valid) {
      this.service
        .updateBillingAddress(this.data.id, this.updateBillingForm.value)
        .subscribe({
          next: (response: any) => {
            this.notify.success(response.message);
            this.onCancel();
          },
          error: (err: HttpErrorResponse) => {
            this.notify.warning(err.error.message);
          },
        });
    }
  }
}
