import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlaceModel } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';

@Component({
    selector: 'app-place-bookings',
    templateUrl: './offer-bookings.page.html',
    styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
    public place: PlaceModel;

    constructor(
        private _route: ActivatedRoute,
        private _navCtrl: NavController,
        private _placesService: PlacesService
    ) {
    }

    ngOnInit() {
        this._route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this._navCtrl.navigateBack('/places/offers');
                return;
            }
            this.place = this._placesService.getPlace(paramMap.get('placeId'));
        });
    }

}
