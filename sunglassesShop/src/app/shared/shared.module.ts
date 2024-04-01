import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStylesDirective } from './styles/form-styles.directive';
import { EmailDirective } from './validators/email.directive';
import { DeliveryCostPipe } from './pipes/delivery-cost.pipe';
import { LoaderComponent } from './loader/loader.component';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';



@NgModule({
  declarations: [
    FormStylesDirective,
    EmailDirective,
    DeliveryCostPipe,
    LoaderComponent,
    ElapsedTimePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormStylesDirective,
    EmailDirective,
    DeliveryCostPipe,
    LoaderComponent,
    ElapsedTimePipe
  ]
})
export class SharedModule { }
