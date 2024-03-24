import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/shared/types/user';
import { SunglassesService } from 'src/app/sunglasses/sunglasses.service';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{
  userId: string | undefined

  constructor(
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService
    ){}

  ngOnInit(): void {
    if(this.authenticationService.getUser()){
      this.userId = this.authenticationService.getUser()?._id
      const searchQuery = encodeURIComponent(`userId="${this.userId}"`)

      this.purchasesService.getUserPurchases(searchQuery).subscribe({
        next: currentUserPurchases=>{
          console.log(currentUserPurchases)
        },

      })

    } else {

    }
   
  }

}
