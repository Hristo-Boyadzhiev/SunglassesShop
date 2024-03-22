import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { SunglassesService } from '../sunglasses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  sunglassesDetails: Sunglasses | undefined

  constructor (
    private activatedRoute: ActivatedRoute,
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService
    ){}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['sunglassesId']

    this.sunglassesService.getSunglassesDetails(id).subscribe({
      next: currentSunglassesDetails =>{
        this.sunglassesDetails = currentSunglassesDetails
        console.log(this.sunglassesDetails)
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
}
