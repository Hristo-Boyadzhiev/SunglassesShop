import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { SunglassesService } from "../sunglasses.service";
import { Sunglasses } from "src/app/shared/types/sunglasses";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class DetailsResolver implements Resolve<Sunglasses>{
  constructor(private sunglassesService: SunglassesService){}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Sunglasses>{
      return this.sunglassesService.getSunglassesDetails(route.params['sunglassesId'])
    }
}