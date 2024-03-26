import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deliveryCost'
})
export class DeliveryCostPipe implements PipeTransform {

  transform(total: number, minTotalforFreeDelivery: number): number {
    if(total > minTotalforFreeDelivery){
      return 0
    } else {
      return 5
    }
  }

}
