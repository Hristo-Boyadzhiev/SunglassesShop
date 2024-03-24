import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Sunglasses } from '../shared/types/sunglasses';

@Injectable({
  providedIn: 'root'
})
export class SunglassesService {
  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  getSunglasses():Observable<Sunglasses[]> {
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

  getSunglassesDetails(id: number):Observable<Sunglasses>{
    return this.http.get<Sunglasses>(`/api/data/sunglasses/${id}`)
  }

  buySunglasses(quantity: number, sunglassesDetails: Sunglasses):Observable<Sunglasses>{
    const data = {
      sunglassesDetails,
      quantity,
      userId: sunglassesDetails._id
  }
    return this.http
    .post<Sunglasses>('/api/data/purchases', data)
  }
}
