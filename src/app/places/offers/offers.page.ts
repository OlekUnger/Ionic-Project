import { Component, OnInit } from '@angular/core';
import { PlaceModel } from '../models/place.model';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  public offers: PlaceModel[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.offers = this.placesService.places;
  }

}
