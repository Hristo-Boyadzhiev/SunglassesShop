import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { SunglassesService } from '../sunglasses.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NgForm } from '@angular/forms';
import { PurchasesService } from 'src/app/purchases/purchases.service';
import { User } from 'src/app/shared/types/user';
import { FavouritesService } from 'src/app/favourites/favourites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoading: boolean = true
  sunglassesDetails: Sunglasses | undefined
  isFavouritesSunglasses: boolean = false
  defaultQuantity = 1
  user: User | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService,
    private favouritesService: FavouritesService,
    private router: Router
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  get isAdmin(): boolean {
    return this.authenticationService.isAdmin
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['sunglassesId']

    this.user = this.authenticationService.getUser()
    const userId = this.user?._id
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`)

    this.sunglassesService.getSunglassesDetails(id).subscribe({
      next: currentSunglassesDetails => {
        this.isLoading = false
        // Ако се опита да влезе на 
        // http://localhost:4200/catalog/(грешно id)
        // пренасочва към /not-found
        // При статус 404 интерсепторът връща празен масив
        if (Array.isArray(currentSunglassesDetails) && currentSunglassesDetails.length === 0) {
          this.router.navigate(['/not-found'])
        } else {
          this.sunglassesDetails = currentSunglassesDetails;

          if (this.isAuthenticated && !this.isAdmin) {

            this.favouritesService.getFavouritesSunglasses(searchQuery).subscribe({
              next: favouritesSunglassesList => {
                if (this.sunglassesDetails) {
                  const currentFavouritesSunglasses = this.favouritesService.findFavouritesSunglasses(favouritesSunglassesList, this.sunglassesDetails)
                  if (currentFavouritesSunglasses) {
                    this.isFavouritesSunglasses = true
                  } else {
                    this.isFavouritesSunglasses = false
                  }
                }
              }
            })
          }
        }
      }
    })
  }

  buySunglassesHandler(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
      return
    }

    const { quantity } = form.value
    const buyerId = this.user?._id
    const buyerEmail = this.user?.email
    const searchQuery = encodeURIComponent(`buyerId="${buyerId}"`)

    this.purchasesService.getUserPurchases(searchQuery).subscribe({
      next: currentUserPurchases => {
        if (this.sunglassesDetails && buyerId && buyerEmail) {
          const userPurchase = this.purchasesService.findBoughtSunglasses(this.sunglassesDetails)
          if (userPurchase) {
            const id = userPurchase._id
            const editQuantity = quantity + userPurchase.quantity
            const sunglassesWithEditedQuantity = { ...userPurchase, quantity: editQuantity, totalPrice: editQuantity * userPurchase.sunglassesDetails.price }
            this.purchasesService.editPurchaseQuantity(id, sunglassesWithEditedQuantity).subscribe()
          } else {
            const totalPrice = quantity * this.sunglassesDetails.price
            this.sunglassesService.buySunglasses(quantity, totalPrice, this.sunglassesDetails, buyerEmail, buyerId).subscribe()
          }
        }
      }
    })
  }


  deleteSunglassesHandler() {
    if (this.sunglassesDetails) {
      const confirm = window.confirm(`Are you sure you want to delete ${this.sunglassesDetails.brand} ${this.sunglassesDetails.model}?`);
      if (confirm) {
        this.sunglassesService.deleteSunglasse(this.sunglassesDetails._id).subscribe({
          next: deletedSunglasses => {
            this.router.navigate(['/sunglasses/catalog'])
          }
        })
      }
    }
  }

  addToFavouritesHandler() {
    const userId = this.user?._id
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`)

    this.favouritesService.getFavouritesSunglasses(searchQuery).subscribe({
      next: favouritesSunglassesList => {
        if (this.sunglassesDetails) {
          const currentFavouritesSunglasses = this.favouritesService.findFavouritesSunglasses(favouritesSunglassesList, this.sunglassesDetails)
          if (currentFavouritesSunglasses) {
            this.isFavouritesSunglasses = false
            this.favouritesService.deleteFavouritesSunglasses(currentFavouritesSunglasses._id).subscribe()
          } else {
            this.isFavouritesSunglasses = true
            this.favouritesService.createFavouritesSunglasses(this.sunglassesDetails).subscribe()
          }
        }
      }
    })
  }
}
