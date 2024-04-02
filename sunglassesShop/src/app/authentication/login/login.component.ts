import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{
  isVisiblePassword: boolean = false
  subscription: Subscription | undefined

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
      alert('Invalid form')
      return
    }

    const { email, password } = this.form.value

    if (typeof email === 'string' && typeof password === 'string') {
      this.subscription = this.authenticationService.login(email, password).subscribe({
        next: currentUser => {
          this.router.navigate(['/sunglasses/catalog'])
        },
        error: () => {
          // Заради стиловете за валидация не използвам this.form.reset()
          // Да измисля как да го оправя
          this.form.setValue({
            email: '',
            password: ''
          })
        }
      })
    } else {
      alert('Invalid login data. Please try again.');
    }
  }

  togglePasswordVisibility(){
    this.isVisiblePassword = !this.isVisiblePassword
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
