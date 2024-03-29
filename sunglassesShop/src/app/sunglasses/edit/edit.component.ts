import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SunglassesService } from '../sunglasses.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { imageUrlValidator } from 'src/app/shared/validators/image-url-validator';
import { HttpErrorResponse } from '@angular/common/http';
import { Sunglasses } from 'src/app/shared/types/sunglasses';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  isLoading: boolean = true
  sunglasses: Sunglasses | undefined
  editedSunglasses: Sunglasses | undefined
  id: string = ''

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
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['sunglassesId']

    this.sunglassesService.getSunglassesDetails(this.id).subscribe({
      next: currentSunglasses => {
        this.isLoading = false
        // Ако се опита да влезе на 
        // http://localhost:4200/catalog/(грешно id)/edit
        // Правилното поведение е да отиде на Not found
        // Да измисля как да стане
        // При статус 404 интерсепторът връща празен масив
        if (Array.isArray(currentSunglasses) && currentSunglasses.length === 0) {
          this.router.navigate(['/sunglasses/catalog'])
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
  }

  editHandler() {
    if (this.form.invalid) {
      console.log('Invalid form')
      return
    }

    this.editedSunglasses = this.form.value as Sunglasses

    this.sunglassesService.editSunglasses(this.id, this.editedSunglasses).subscribe({
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
        } else {
          alert('This sunglasses is not found')
        }
      }
    })
  }
}