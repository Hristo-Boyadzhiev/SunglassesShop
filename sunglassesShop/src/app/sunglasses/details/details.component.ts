import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  sunglassesDetails: Sunglasses | undefined

  constructor (private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.sunglassesDetails = this.activatedRoute.snapshot.data['sunglassesId']
    console.log(this.sunglassesDetails)
  }
}
