import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { imageUrlValidator } from 'src/app/shared/validators/image-url-validator';
import { SunglassesService } from '../sunglasses.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnDestroy {
  sunglasses: Sunglasses | undefined
  subscription: Subscription | undefined
  errorMessage: string = ''

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
      this.errorMessage = 'Invalid form'
      return
    }

    const { brand, model, price, imageUrl, gender, shape, frameColor, glassColor } = this.form.value

    if (typeof brand === 'string' && typeof model === "string" &&
      typeof price === 'number' && typeof imageUrl === 'string' &&
      typeof gender === 'string' && typeof shape === 'string' &&
      typeof frameColor === 'string' && typeof glassColor === 'string') {

      this.sunglasses = this.form.value as Sunglasses

      this.subscription = this.sunglassesService.createSunglasses(this.sunglasses).subscribe({
        next: newSunglasses => {
          this.router.navigate(['/sunglasses/catalog'])
        }
      })

    } else {
      this.errorMessage = 'Invalid data. Please try again.'
      return
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
