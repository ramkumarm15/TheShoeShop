import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { NotifyService } from 'src/app/Service/notify.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css'],
})
export class CreateAddressComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private service: BillingAddressService,
    public dialogRef: MatDialogRef<CreateAddressComponent>,
    private notify: NotifyService,
    private cdRef: ChangeDetectorRef
  ) { }

  createBillingForm!: FormGroup;

  ngOnInit(): void {
    this.createBillingForm = this.fb.group({
      billingName: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', [Validators.required]],
      defaultAddress: [false],
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.createBillingForm.controls['defaultAddress'].clearValidators()
    this.createBillingForm.controls['defaultAddress'].updateValueAndValidity();
    console.log(this.createBillingForm);
    if (this.createBillingForm.valid) {
      this.service
        .createBillingAddress(this.createBillingForm.value)
        .subscribe({
          next: (response: BillingResponse) => {
            console.log(response);
            this.notify.success(response.message);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.notify.warning(err.error.message);
          },
        });
    }
  }

  mobileNumberLengthCheck(e: Event): void {
    let mobileNumber = (e.target as HTMLInputElement).value;

    if (mobileNumber.length !== 10) {
      this.createBillingForm.controls['mobileNumber'].setErrors({
        requiredLength: true,
      });
    } else if (mobileNumber.length === 10) {
      this.createBillingForm.controls['mobileNumber'].setValue(
        Number(mobileNumber)
      );
    }
  }

}
export interface BillingResponse {
  message: string;
}
