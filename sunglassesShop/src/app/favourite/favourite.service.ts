import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sunglasses } from '../shared/types/sunglasses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }

  createFavouriteSunglasses(sunglasses: Sunglasses): Observable<Sunglasses> {
    return this.http
      .post<Sunglasses>('/api/data/favouriteSunglasses', sunglasses)
  }
}
