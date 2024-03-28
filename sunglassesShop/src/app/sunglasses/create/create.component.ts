import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { imageUrlValidator } from 'src/app/shared/validators/image-url-validator';
import { SunglassesService } from '../sunglasses.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Sunglasses } from 'src/app/shared/types/sunglasses';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  sunglasses: Sunglasses | undefined

  form = this.fb.group({
    brand: ['', [Validators.required, Validators.maxLength(10)]],
    model: ['', [Validators.required, Validators.maxLength(10)]],
    price: [1, [Validators.required, Validators.min(1)]],
    imageUrl: ['', [Validators.required, imageUrlValidator()]],
    gender: ['', [Validators.required]],
    shape: ['', [Validators.required, Validators.maxLength(10)]],
    frameColor: ['', [Validators.required, Validators.maxLength(10)]],
    glassColor: ['', [Validators.required, Validators.maxLength(10)]],
  })

  constructor(
    private fb: FormBuilder,
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  createHandler() {
    if (this.form.invalid) {
      console.log('Invalid form')
      return
    }

    this.sunglasses = this.form.value as Sunglasses

    this.sunglassesService.createSunglasses(this.sunglasses).subscribe({
      next: newSunglasses => {
        this.router.navigate(['/catalog'])
      },
      error: (responseError: HttpErrorResponse) => {
        if (responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
        } else {
          alert(responseError.error.message)

          this.form.setValue({
            brand: '',
            model: '',
            price: 1,
            imageUrl: '',
            gender: '',
            shape: '',
            frameColor: '',
            glassColor: '',
          })
        }
      }
    })
  }
}
