import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product, ProductResponse } from 'src/app/Model/product';
import { NotifyService } from 'src/app/Service/notify.service';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  submitted: boolean = false;
  productId!: number;
  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private notify: NotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      name: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.productId = Number(param.get('id')) || 0;
    });
    if (this.productId !== 0) {
      this.getProduct();
    }
  }

  getProduct(): void {
    this.service.getProductById(this.productId).subscribe({
      next: (response: Product) => {
        this.populateFormValue(response);
      },
    });
  }

  populateFormValue(data: Product) {
    this.updateProductForm.controls['name'].setValue(data.name);
    this.updateProductForm.controls['slug'].setValue(data.slug);
    this.updateProductForm.controls['description'].setValue(data.description);
    this.updateProductForm.controls['price'].setValue(data.price);
    this.updateProductForm.controls['image'].setValue(data.image);
  }

  populateNameInputValueToSlug(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    console.log(value);
    this.updateProductForm.controls['slug'].setValue(this.slugify(value));
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
    if (this.updateProductForm.valid) {
      this.service
        .updateProduct(this.updateProductForm.value, this.productId)
        .subscribe({
          next: (res: ProductResponse) => {
            console.log(res);
            this.notify.success(res.message);
            this.submitted = false;
            this.getProduct();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.notify.error(err.error.message);
          },
        });
    }
  }
}
