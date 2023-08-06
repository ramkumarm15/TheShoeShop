import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillingAddress } from 'src/app/Model/billing-address';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { CreateAddressComponent } from './create-address/create-address.component';
import { DeleteAddressComponent } from './delete-address/delete-address.component';
import { UpdateAddressComponent } from './update-address/update-address.component';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css'],
})
export class BillingAddressComponent implements OnInit {
  data!: BillingAddress[];

  constructor(
    private dialog: MatDialog,
    private service: BillingAddressService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData():void {
    this.service.getBillingAddress().subscribe({
      next: (response: BillingAddress[]) => {
        console.log(response);
        this.data = response;
      },
    });
  }

  openDialog(comp: string, id: number = 0) {
    if (comp === 'create') {
      const dialogRef = this.dialog.open(CreateAddressComponent, {
        height: '600px',
        width: '800px',
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((res) => {
        console.log(res);
        this.getData();
      });
    } else if (comp === 'update') {
      const dialogRef = this.dialog.open(UpdateAddressComponent, {
        height: '600px',
        width: '800px',
        autoFocus: false,
        data: {
          id,
        },
      });

      dialogRef.afterClosed().subscribe((res) => {
        console.log(res);
        this.getData();
      });
    } else if (comp === 'delete') {
      const dialogRef = this.dialog.open(DeleteAddressComponent, {
        data: {
          id,
        },
      });

      dialogRef.afterClosed().subscribe((res) => {
        console.log(res);
        this.getData();
      });
    }
  }
}
