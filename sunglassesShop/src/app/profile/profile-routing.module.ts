import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



const routes: Routes = [
  // Гард да сложа
  {
    path: 'user', children: [
      { path: ':userId', component: ProfileComponent },
      { path: ':userId/edit', component: EditProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

