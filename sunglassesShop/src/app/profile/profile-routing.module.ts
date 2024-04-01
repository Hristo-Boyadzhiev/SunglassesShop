import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    // Гард да сложа
    // Да опиша routes по-добре + за edit
    {path: 'user/:userId', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

