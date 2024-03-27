import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Sunglasses } from '../shared/types/sunglasses';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SunglassesService {
  apiUrl: string = environment.apiUrl


  constructor(
    private http: HttpClient,
    private authenticationService:AuthenticationService
    ) {}

  subscribeBuySunglasses(quantity: number, totalPrice: number, sunglassesDetails: Sunglasses, buyerEmail:string , buyerId:string){

      this.buySunglasses(quantity, totalPrice, sunglassesDetails, buyerEmail , buyerId).subscribe({
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

  createSunglasses(brand: string, model: string, price: number, imageUrl: string, gender: string, shape: string, frameColor: string, glassColor: string): Observable<Sunglasses[]> {
    return this.http
      .post<Sunglasses[]>('/api/data/sunglasses', {
        brand,
        model,
        price,
        imageUrl,
        gender,
        shape,
        frameColor,
        glassColor
      })
  }

  getSunglassesDetails(id: number): Observable<Sunglasses> {
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
}
