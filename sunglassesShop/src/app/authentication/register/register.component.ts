import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { matchPassword } from 'src/app/shared/validators/match-passwords-validator';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/types/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  isVisiblePassword: boolean = false
  isVisibleRePassword: boolean = false
  subscription: Subscription | undefined
  user: User | undefined
  errorMessage: string = ''

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(15)]],
    lastName: ['', [Validators.required, Validators.maxLength(15)]],
    email: ['', [Validators.required, emailValidator()]],
    passwordsGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      rePassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    },
      {
        validators: [matchPassword()]
      })
  })

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  register() {
    if (this.form.invalid) {
      this.errorMessage = 'Invalid form'
      return
    }
    const { firstName, lastName, email, passwordsGroup: { password, rePassword } = {} } = this.form.value

    if (typeof firstName === 'string' && typeof lastName === 'string' &&
      typeof email === 'string' && typeof password === 'string') {

      this.user = { firstName, lastName, email, password } as User

      this.subscription = this.authenticationService.register(this.user).subscribe({
        next: registeredUser => {
          this.router.navigate(['/sunglasses/catalog'])
        },
        error: (responseError: HttpErrorResponse) => {
          this.form.setValue({
            firstName: '',
            lastName: '',
            email: '',
            passwordsGroup:
            {
              password: '',
              rePassword: ''
            }
          })
          this.errorMessage = responseError.error.message
        }
      })
    } else {
      this.errorMessage='Invalid register data. Please try again.'
      return
    }
  }

  togglePasswordVisibility() {
    this.isVisiblePassword = !this.isVisiblePassword
  }

  toggleRePasswordVisibility() {
    this.isVisibleRePassword = !this.isVisibleRePassword
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
