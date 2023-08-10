import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product, ProductResponse } from 'src/app/Model/product';
import { NotifyService } from 'src/app/Service/notify.service';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  createProductForm!: FormGroup;
  submitted: boolean = false;
  productId!: number;
  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private notify: NotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  populateNameInputValueToSlug(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    console.log(value);
    this.createProductForm.controls['slug'].setValue(this.slugify(value));
  }

  slugify(value: string) {
    return String(value)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  formSubmit() {
    this.submitted = true;
    if (this.createProductForm.valid) {
      this.service
        .updateProduct(this.createProductForm.value, this.productId)
        .subscribe({
          next: (res: ProductResponse) => {
            console.log(res);
            this.notify.success(res.message);
            this.submitted = false;
            this.createProductForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.notify.error(err.error.message);
          },
        });
    }
  }
}
