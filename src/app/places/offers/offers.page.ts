import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { PlaceModel } from '../models/place.model';
import { PlacesService } from '../services/places.service';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
    public offers: PlaceModel[];

    constructor(private placesService: PlacesService, private _router: Router) {
    }

    public ngOnInit(): void {
        this.offers = this.placesService.places;
    }

    public onEdit(id: string, slidingItem: IonItemSliding): void {
        slidingItem.close();
        this._router.navigateByUrl(`/places/offers/edit/${id}`);
    }

}
