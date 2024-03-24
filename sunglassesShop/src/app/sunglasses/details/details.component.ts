import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { SunglassesService } from '../sunglasses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  sunglassesDetails: Sunglasses | undefined
  defaultQuantity = 1

  constructor(
    private activatedRoute: ActivatedRoute,
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['sunglassesId']

    this.sunglassesService.getSunglassesDetails(id).subscribe({
      next: currentSunglassesDetails => {
        this.sunglassesDetails = currentSunglassesDetails
        // console.log(this.sunglassesDetails)
      },
      error: (responseError: HttpErrorResponse) => {
        if (responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
        } else {
          alert(responseError.error.message)
        }
      }
    })
  }

  quantityHandler(form:NgForm){
    if(form.invalid){
      console.log('Invalid form')
      return
    }

    const {quantity} = form.value

    if(this.sunglassesDetails){
      this.sunglassesService.buySunglasses(quantity, this.sunglassesDetails).subscribe({
        next: boughtSunglasses=>{
          console.log(boughtSunglasses)
        }
      })
    }




    // const data = {
      //     furniture,
      //     quantity: 1,
      //     userId,
      //     userEmail
      // }
  }

}
