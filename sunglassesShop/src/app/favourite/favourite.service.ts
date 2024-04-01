import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sunglasses } from '../shared/types/sunglasses';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { FavouriteSunglasses } from '../shared/types/favouriteSunglasses';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(private http: HttpClient) {}

  findFavouriteSunglasses(favouriteSunglassesList: FavouriteSunglasses[], sunglasses: Sunglasses) {
    const currentFavouriteSunglasses = favouriteSunglassesList.find(favouriteSunglasses => {
     return favouriteSunglasses.sunglasses._id === sunglasses._id
    })
    return currentFavouriteSunglasses
  }

  createFavouriteSunglasses(sunglasses: Sunglasses): Observable<FavouriteSunglasses> {
    return this.http
      .post<FavouriteSunglasses>('/api/data/favouriteSunglasses', {
        sunglasses
      })
  }

  getFavouriteSunglasses(searchQuery: string):Observable<FavouriteSunglasses[]>{
    return this.http
    .get<FavouriteSunglasses[]>(`/api/data/favouriteSunglasses?where=${searchQuery}`)
  }

  deleteFavouriteSunglasses(id: string):Observable<FavouriteSunglasses>{
    return this.http
    .delete<FavouriteSunglasses>(`/api/data/favouriteSunglasses/${id}`)
  }
}
