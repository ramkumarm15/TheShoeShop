import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../Model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private PRODUCT_ITEM = environment.PRODUCT_API;

  constructor(private http: HttpClient) {}

  /**
   * Get all products from Product API
   */
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.PRODUCT_ITEM}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCT_ITEM}/${id}`);
  }

  updateProduct(data: Product, id: number): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.PRODUCT_ITEM}/${id}`, data);
  }
}
