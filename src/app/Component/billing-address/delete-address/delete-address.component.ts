import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { NotifyService } from 'src/app/Service/notify.service';

@Component({
  selector: 'app-delete-address',
  templateUrl: './delete-address.component.html',
  styleUrls: ['./delete-address.component.css'],
})
export class DeleteAddressComponent implements OnInit, AfterViewInit {
  constructor(
    private service: BillingAddressService,
    private notify: NotifyService,
    public dialogRef: MatDialogRef<DeleteAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.service.deleteBillingAddress(this.data.id).subscribe({
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
