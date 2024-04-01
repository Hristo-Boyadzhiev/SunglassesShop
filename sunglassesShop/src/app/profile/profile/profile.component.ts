import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/types/user';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUser()
  }

  // deleteUserHandler(){

  // }
}
