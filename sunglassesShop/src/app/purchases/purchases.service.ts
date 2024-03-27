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

  transfortUserPurchaseInCompletedPurchase() {
    this.userPurchases.forEach(purchase => {
      this.deletePurchase(purchase._id).subscribe({
        next: deletedPurchase => {
        },
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

      this.createCompletedPurchases(purchase.quantity, purchase.totalPrice, purchase.sunglassesDetails, purchase.buyerId).subscribe({
        next: completedPurchase => {
        },
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

  createCompletedPurchases(quantity: number, totalPrice: number, sunglassesDetails: Sunglasses, buyerId: string): Observable<Purchase> {
    return this.http
      .post<Purchase>('/api/data/completedPurchases', {
        quantity,
        totalPrice,
        sunglassesDetails,
        buyerId
      })
  }

  getCompletePurchases(): Observable<Purchase[]> {
    return this.http
      .get<Purchase[]>('/api/data/completedPurchases')
  }

  deleteCompletedPurchase(id: string): Observable<Purchase> {
    return this.http
      .delete<Purchase>(`/api/data/completedPurchases/${id}`)
  }
}
