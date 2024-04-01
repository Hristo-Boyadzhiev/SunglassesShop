import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { SunglassesService } from '../sunglasses.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NgForm } from '@angular/forms';
import { PurchasesService } from 'src/app/purchases/purchases.service';
import { User } from 'src/app/shared/types/user';
import { FavouriteService } from 'src/app/favourite/favourite.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoading: boolean = true
  id: string = ''
  sunglassesDetails: Sunglasses | undefined
  defaultQuantity = 1
  user: User | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService,
    private favouriteService: FavouriteService,
    private router: Router
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  get isAdmin(): boolean {
    return this.authenticationService.isAdmin
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['sunglassesId']

    this.sunglassesService.getSunglassesDetails(this.id).subscribe({
      next: currentSunglassesDetails => {
        this.isLoading = false
        // Ако се опита да влезе на 
        // http://localhost:4200/catalog/(грешно id)/edit
        // Правилното поведение е да отиде на Not found
        // Да измисля как да стане
        // При статус 404 интерсепторът връща празен масив
        if (Array.isArray(currentSunglassesDetails) && currentSunglassesDetails.length === 0) {
          this.router.navigate(['/sunglasses/catalog'])
        } else {
          this.sunglassesDetails = currentSunglassesDetails;
          // console.log(currentSunglassesDetails);
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
    this.user = this.authenticationService.getUser()

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
            this.purchasesService.subscribeEditPurchaseQuantity(id, sunglassesWithEditedQuantity)
          } else {
            const totalPrice = quantity * this.sunglassesDetails.price
            this.sunglassesService.subscribeBuySunglasses(quantity, totalPrice, this.sunglassesDetails, buyerEmail, buyerId)
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

  addToFavouriteHandler() {
    this.user = this.authenticationService.getUser()
    const userId = this.user?._id
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`)

    if (this.sunglassesDetails) {
      this.favouriteService.getFavouriteSunglasses(searchQuery).subscribe({
        next: favouriteSunglassesList => {
          if (this.sunglassesDetails) {
            const currentFavouriteSunglasses = this.favouriteService.findFavouriteSunglasses(favouriteSunglassesList, this.sunglassesDetails)
            if (!currentFavouriteSunglasses) {
              this.favouriteService.createFavouriteSunglasses(this.sunglassesDetails).subscribe({
                next: newFavouriteSunglasses => {
                }
              })
            }
          }
        }
      })
    }
  }
}
