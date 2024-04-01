import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/authenticate/authenticate.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit(): void {

    this.authenticateService.getUserInfo().subscribe({
      next: currentUser => {
        console.log(currentUser)
          this.user = currentUser
      }
    })
  }
}
