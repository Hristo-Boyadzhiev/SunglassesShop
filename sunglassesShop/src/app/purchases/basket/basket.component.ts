import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/shared/types/user';
import { SunglassesService } from 'src/app/sunglasses/sunglasses.service';
import { PurchasesService } from '../purchases.service';
import { Purchase } from 'src/app/shared/types/purchase';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{
  buyerId: string | undefined
  purchasesList: Purchase[] = []

  constructor(
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService
    ){}

  ngOnInit(): void {
    if(this.authenticationService.getUser()){
      this.buyerId = this.authenticationService.getUser()?._id
      const searchQuery = encodeURIComponent(`buyerId="${this.buyerId}"`)

      this.purchasesService.getUserPurchases(searchQuery).subscribe({
        next: currentUserPurchases=>{
          console.log(currentUserPurchases)
          this.purchasesList = currentUserPurchases
        },

      })

    } else {

    }
   
  }

}
