import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/authenticate/authenticate.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/shared/types/user';
import { emailValidator } from 'src/app/shared/validators/email-validator';
import { matchPassword } from 'src/app/shared/validators/match-passwords-validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isLoading: boolean = true
  user: User | undefined
  editedUser: User | undefined

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
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUser()
    
    if(this.user){
      this.isLoading = false
      this.form.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        passwordsGroup: {
          password: this.user.password,
          rePassword: this.user.password
        }
      })
    }
  }

  editUser() {
    if (this.form.invalid) {
      console.log('Invalid form')
      return
    }

    this.editedUser = this.form.value as User




  }
}





