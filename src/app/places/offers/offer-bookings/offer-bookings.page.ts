import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlaceModel } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';

@Component({
    selector: 'app-place-bookings',
    templateUrl: './offer-bookings.page.html',
    styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
    public place: PlaceModel;
    private _placeSub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _navCtrl: NavController,
        private _placesService: PlacesService
    ) {
    }

    public ngOnInit(): void {
        this._route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this._navCtrl.navigateBack('/places/offers');
                return;
            }
            this._placeSub = this._placesService.getPlace(paramMap.get('placeId'))
                .subscribe((place: PlaceModel) => {
                    this.place = place;
                });
        });
    }

    public ngOnDestroy(): void {
        if (this._placeSub)
            this._placeSub.unsubscribe();
    }

}
