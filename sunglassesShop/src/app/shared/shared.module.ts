import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStylesDirective } from './styles/form-styles.directive';
import { EmailDirective } from './validators/email.directive';
import { DeliveryCostPipe } from './pipes/delivery-cost.pipe';



@NgModule({
  declarations: [
    FormStylesDirective,
    EmailDirective,
    DeliveryCostPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormStylesDirective,
    EmailDirective,
    DeliveryCostPipe
  ]
})
export class SharedModule { }
