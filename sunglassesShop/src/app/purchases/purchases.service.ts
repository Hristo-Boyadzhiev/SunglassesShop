import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient) { }

  // От тип Observable
  getUserPurchases(searchQuery: string) {
    return this.http.get(`/api/data/purchases?where=${searchQuery}`)
  }
}
