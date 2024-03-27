import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Purchase } from '../shared/types/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient) { }

  getUserPurchases(searchQuery: string):Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`/api/data/purchases?where=${searchQuery}`)
  }

  editPurchaseQuantity(id:string, sunglassesWithEditedQuantity: Purchase):Observable<Purchase>{
    return this.http
    .put<Purchase>(`/api/data/purchases/${id}`, sunglassesWithEditedQuantity)
  }

  deletePurchase(id:string):Observable<Purchase>{
    return this.http
    .delete<Purchase>(`/api/data/purchases/${id}`)
  }
}
