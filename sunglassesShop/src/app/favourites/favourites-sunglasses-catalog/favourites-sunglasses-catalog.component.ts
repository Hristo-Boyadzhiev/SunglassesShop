import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FavouritesSunglasses } from 'src/app/shared/types/favouritesSunglasses';
import { FavouritesService } from '../favourites.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-favourites-sunglasses-catalog',
  templateUrl: './favourites-sunglasses-catalog.component.html',
  styleUrls: ['./favourites-sunglasses-catalog.component.css']
})
export class FavouritesSunglassesCatalogComponent {
  isLoading: boolean = true
  isEmptyCollection: boolean = false
  favouriteSunglassesCollection: FavouritesSunglasses[] = []
  user: User | undefined

  constructor(
    private favouritesService: FavouritesService,
    private authenticationService: AuthenticationService
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUser()
    const userId = this.user?._id
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`)

    this.favouritesService.getFavouritesSunglasses(searchQuery).subscribe({
      next: favouritesSunglassesList => {
        this.isLoading = false
        if (favouritesSunglassesList.length === 0) {
          this.isEmptyCollection = true
        } else {
          this.isEmptyCollection = false
          this.favouriteSunglassesCollection = favouritesSunglassesList
        }
      }
    })
  }
}

