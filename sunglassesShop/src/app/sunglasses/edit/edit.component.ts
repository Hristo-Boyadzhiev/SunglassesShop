import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SunglassesService } from '../sunglasses.service';
import { imageUrlValidator } from 'src/app/shared/validators/image-url-validator';
import { HttpErrorResponse } from '@angular/common/http';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  sunglasses: Sunglasses | undefined
  editedSunglasses: Sunglasses | undefined
  id: string = ''
  subscriptions: Subscription[] = []
  errorMessage: string = ''

  form = this.fb.group({
    brand: ['', [Validators.required, Validators.maxLength(10)]],
    model: ['', [Validators.required, Validators.maxLength(10)]],
    price: [0, [Validators.required, Validators.min(1)]],
    imageUrl: ['', [Validators.required, imageUrlValidator()]],
    gender: ['', [Validators.required]],
    shape: ['', [Validators.required, Validators.maxLength(10)]],
    frameColor: ['', [Validators.required, Validators.maxLength(10)]],
    glassColor: ['', [Validators.required, Validators.maxLength(10)]],
  })

  constructor(
    private fb: FormBuilder,
    private sunglassesService: SunglassesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['sunglassesId']

    const subscription = this.sunglassesService.getSunglassesDetails(this.id).subscribe({
      next: currentSunglasses => {
        this.isLoading = false
        if (Array.isArray(currentSunglasses) && currentSunglasses.length === 0) {
          this.router.navigate(['/not-found'])
        } else {
          this.sunglasses = currentSunglasses
          this.form.setValue({
            brand: this.sunglasses.brand,
            model: this.sunglasses.model,
            price: this.sunglasses.price,
            imageUrl: this.sunglasses.imageUrl,
            gender: this.sunglasses.gender,
            shape: this.sunglasses.shape,
            frameColor: this.sunglasses.frameColor,
            glassColor: this.sunglasses.glassColor
          })
        }
      }
    })
    this.subscriptions.push(subscription)
  }

  editHandler() {
    if (this.form.invalid) {
      this.errorMessage = 'Invalid form'
      return
    }

    const { brand, model, price, imageUrl, gender, shape, frameColor, glassColor } = this.form.value

    if (typeof brand === 'string' && typeof model === "string" &&
      typeof price === 'number' && typeof imageUrl === 'string' &&
      typeof gender === 'string' && typeof shape === 'string' &&
      typeof frameColor === 'string' && typeof glassColor === 'string') {

      this.editedSunglasses = this.form.value as Sunglasses

      const subscription = this.sunglassesService.editSunglasses(this.id, this.editedSunglasses).subscribe({
        next: newSunglasses => {
          this.router.navigate([`/sunglasses/catalog/${this.id}`])
        },
        error: (responseError: HttpErrorResponse) => {
          if (this.sunglasses) {
            this.form.setValue({
              brand: this.sunglasses.brand,
              model: this.sunglasses.model,
              price: this.sunglasses.price,
              imageUrl: this.sunglasses.imageUrl,
              gender: this.sunglasses.gender,
              shape: this.sunglasses.shape,
              frameColor: this.sunglasses.frameColor,
              glassColor: this.sunglasses.glassColor
            })
            this.errorMessage = responseError.error.message
          } else {
            this.errorMessage = 'This sunglasses is not found'
          }
        }
      })
      this.subscriptions.push(subscription)
    } else {
      this.errorMessage = 'Invalid data. Please try again.'
      return
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}