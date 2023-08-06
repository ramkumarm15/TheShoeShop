import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingAddress } from '../Model/billing-address';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillingAddressService {
  private BILLING_ADDRESS_API: string = environment.BILLING_ADDRESS_API;

  constructor(private http: HttpClient) {}

  getBillingAddress(): Observable<BillingAddress[]> {
    return this.http.get<BillingAddress[]>(`${this.BILLING_ADDRESS_API}`);
  }

  getBillingAddressById(id: number): Observable<BillingAddress> {
    return this.http.get<BillingAddress>(`${this.BILLING_ADDRESS_API}/${id}`);
  }

  createBillingAddress(data: BillingAddress): Observable<any> {
    return this.http.post(`${this.BILLING_ADDRESS_API}`, data);
  }

  updateBillingAddress(id: number, data: BillingAddress): Observable<any> {
    return this.http.put(`${this.BILLING_ADDRESS_API}/${id}`, data);
  }

  deleteBillingAddress(id: number): Observable<any> {
    return this.http.delete(`${this.BILLING_ADDRESS_API}/${id}`);
  }
}
