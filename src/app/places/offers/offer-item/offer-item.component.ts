import { Component, Input, OnInit } from '@angular/core';
import { PlaceModel } from '../../models/place.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() public offer: PlaceModel;

  constructor() { }

  public ngOnInit() {}

  public getDummyDate(): Date {
    return new Date();
  }

}
