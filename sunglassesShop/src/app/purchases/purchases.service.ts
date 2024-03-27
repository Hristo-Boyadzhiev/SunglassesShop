import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Purchase } from '../shared/types/purchase';
import { Sunglasses } from '../shared/types/sunglasses';
import { AuthenticationService } from '../authentication/authentication.service';

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
    private authenticationService: AuthenticationService
    ) {
    this.subscription = this.userPurchases$.subscribe({
      next: currentUserPurchases => {
        this.userPurchases = currentUserPurchases
      }
    })
  }

  findBoughtSunglases(sunglasses: Sunglasses) {
    const userPurchase = this.userPurchases.find(purchase => {
      return purchase.sunglassesDetails._id === sunglasses._id
    })
    return userPurchase
  }

  subscribeEditPurchaseQuantity(id: string, sunglassesWithEditedQuantity: Purchase) {
    this.editPurchaseQuantity(id, sunglassesWithEditedQuantity).subscribe({
      next: editedSunglasses => {
        // console.log(editedSunglasses)
      }
      ,
      error: (responseError: HttpErrorResponse) => {
        // Когато съм logged и рестартирам server-a. Като вляза на страница, която прави заявка се получава грешката.
        // Да тествам дали работи оптимално.
        if (responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
        } else {
          alert(responseError.error.message)
        }
      }
    })
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
}
