import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sunglasses } from '../shared/types/sunglasses';
import { Observable } from 'rxjs';
import { FavouritesSunglasses } from '../shared/types/favouritesSunglasses';


@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  constructor(private http: HttpClient) { }

  findFavouritesSunglasses(favouritesSunglassesList: FavouritesSunglasses[], sunglasses: Sunglasses) {
    const currentFavouritesSunglasses = favouritesSunglassesList.find(favouritesSunglasses => {
      return favouritesSunglasses.sunglasses._id === sunglasses._id
    })
    return currentFavouritesSunglasses
  }

  createFavouritesSunglasses(sunglasses: Sunglasses): Observable<FavouritesSunglasses> {
    return this.http
      .post<FavouritesSunglasses>('/api/data/favouritesSunglasses', {
        sunglasses
      })
  }

  getFavouritesSunglasses(searchQuery: string): Observable<FavouritesSunglasses[]> {
    return this.http
      .get<FavouritesSunglasses[]>(`/api/data/favouritesSunglasses?where=${searchQuery}`)
  }

  deleteFavouritesSunglasses(id: string): Observable<FavouritesSunglasses> {
    return this.http
      .delete<FavouritesSunglasses>(`/api/data/favouritesSunglasses/${id}`)
  }
}
