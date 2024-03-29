import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { imageUrlValidator } from 'src/app/shared/validators/image-url-validator';
import { SunglassesService } from '../sunglasses.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
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
        this.router.navigate(['/sunglasses/catalog'])
      },
      error: (responseError: HttpErrorResponse) => {
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
    })
  }
}
