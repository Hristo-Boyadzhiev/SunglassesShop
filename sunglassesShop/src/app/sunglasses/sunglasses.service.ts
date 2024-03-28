import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, tap } from 'rxjs';
import { Sunglasses } from '../shared/types/sunglasses';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SunglassesService {
  apiUrl: string = environment.apiUrl


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  subscribeBuySunglasses(quantity: number, totalPrice: number, sunglassesDetails: Sunglasses, buyerEmail: string, buyerId: string) {

    this.buySunglasses(quantity, totalPrice, sunglassesDetails, buyerEmail, buyerId).subscribe({
      next: boughtSunglasses => {
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
  }

  getSunglasses(): Observable<Sunglasses[]> {
    return this.http.get<Sunglasses[]>('/api/data/sunglasses')
  }

  createSunglasses(sunglasses: Sunglasses): Observable<Sunglasses> {
    return this.http
      .post<Sunglasses>('/api/data/sunglasses', sunglasses)
  }

  getSunglassesDetails(id: string): Observable<Sunglasses> {
    return this.http.get<Sunglasses>(`/api/data/sunglasses/${id}`)
  }

  buySunglasses(quantity: number, totalPrice: number, sunglassesDetails: Sunglasses, buyerEmail: string, buyerId: string): Observable<Sunglasses> {
    return this.http
      .post<Sunglasses>('/api/data/purchases', {
        sunglassesDetails,
        quantity,
        totalPrice,
        buyerEmail,
        buyerId
      })
  }

  editSunglasses(id: string, editedSunglasses: Sunglasses): Observable<Sunglasses> {
    return this.http
      .put<Sunglasses>(`/api/data/sunglasses/${id}`, editedSunglasses)
  }

  deleteSunglasse(id: string):Observable<Sunglasses>{
    return this.http
    .delete<Sunglasses>(`/api/data/sunglasses/${id}`)
  }
}
