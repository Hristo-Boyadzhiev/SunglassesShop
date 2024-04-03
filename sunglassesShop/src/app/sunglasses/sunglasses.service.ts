import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Sunglasses } from '../shared/types/sunglasses';


@Injectable({
  providedIn: 'root'
})
export class SunglassesService {
  apiUrl: string = environment.apiUrl


  constructor(private http: HttpClient) { }

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

  deleteSunglasse(id: string): Observable<Sunglasses> {
    return this.http
      .delete<Sunglasses>(`/api/data/sunglasses/${id}`)
  }
}
