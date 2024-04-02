import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Purchase } from '../shared/types/purchase';
import { Sunglasses } from '../shared/types/sunglasses';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private userPurchases$$ = new BehaviorSubject<Purchase[]>([])
  userPurchases$ = this.userPurchases$$.asObservable()

  userPurchases: Purchase[] = []
  subscription: Subscription

  constructor(
    private http: HttpClient,
  ) {
    this.subscription = this.userPurchases$.subscribe({
      next: currentUserPurchases => {
        this.userPurchases = currentUserPurchases
      }
    })
  }

  findBoughtSunglasses(sunglasses: Sunglasses) {
    const userPurchase = this.userPurchases.find(purchase => {
      return purchase.sunglassesDetails._id === sunglasses._id
    })
    return userPurchase
  }

  transfortUserPurchaseInCompletedPurchase() {
    this.userPurchases.forEach(purchase => {
      this.deletePurchase(purchase._id).subscribe({
        next: deletedPurchase => {
        }
      })

      this.createCompletedPurchases(purchase.quantity, purchase.totalPrice, purchase.sunglassesDetails, purchase.buyerEmail ,purchase.buyerId).subscribe({
        next: completedPurchase => {
        }
      })
    });
  }

  getUserPurchases(searchQuery: string): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`/api/data/purchases?where=${searchQuery}`)
      .pipe(tap((userPurchases) => {
        this.userPurchases$$.next(userPurchases)
      }))
  }

  editPurchaseQuantity(id: string, sunglassesWithEditedQuantity: Purchase): Observable<Purchase> {
    return this.http
      .put<Purchase>(`/api/data/purchases/${id}`, sunglassesWithEditedQuantity)
  }

  deletePurchase(id: string): Observable<Purchase> {
    return this.http
      .delete<Purchase>(`/api/data/purchases/${id}`)
  }

  createCompletedPurchases(quantity: number, totalPrice: number, sunglassesDetails: Sunglasses, buyerEmail:string ,buyerId: string): Observable<Purchase> {
    return this.http
      .post<Purchase>('/api/data/completedPurchases', {
        quantity,
        totalPrice,
        sunglassesDetails,
        buyerEmail,
        buyerId
      })
  }

  getCompletePurchases(): Observable<Purchase[]> {
    return this.http
      .get<Purchase[]>('/api/data/completedPurchases')
  }

}
