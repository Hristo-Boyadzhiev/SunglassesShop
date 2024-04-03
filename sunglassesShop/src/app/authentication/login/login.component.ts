import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/types/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  isVisiblePassword: boolean = false
  subscription: Subscription | undefined
  user: User | undefined
  errorMessage: string = ''

  form = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
  })

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  login() {
    if (this.form.invalid) {
      this.errorMessage = 'Invalid form'
      return
    }

    const { email, password } = this.form.value
    if (typeof email === 'string' && typeof password === 'string') {
      this.user = this.form.value as User

      this.subscription = this.authenticationService.login(this.user).subscribe({
        next: currentUser => {
          this.router.navigate(['/sunglasses/catalog'])
        },
        error: (responseError: HttpErrorResponse) => {
          this.form.setValue({
            email: '',
            password: ''
          })
          this.errorMessage = responseError.error.message
        }
      })
    } else {
      this.errorMessage = 'Invalid login data. Please try again.'
      return
    }
  }

  togglePasswordVisibility() {
    this.isVisiblePassword = !this.isVisiblePassword
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
