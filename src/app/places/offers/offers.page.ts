import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlaceModel } from '../models/place.model';
import { PlacesService } from '../services/places.service';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
    public offers: PlaceModel[];
    public isLoading: boolean = false;
    private _placesSub: Subscription;

    constructor(private _placesService: PlacesService, private _router: Router) {
    }

    public ngOnInit(): void {
        this._placesSub = this._placesService.places
            .subscribe((places: PlaceModel[]) => {
                this.offers = places;
            });
    }

    public ionViewWillEnter(): void {
        this.isLoading = true;
        this._placesService.fetchPlaces().subscribe(() => this.isLoading = false);
    }

    public onEdit(id: string, slidingItem: IonItemSliding): void {
        slidingItem.close();
        this._router.navigateByUrl(`/places/offers/edit/${id}`);
    }

    public ngOnDestroy(): void {
        if (this._placesSub)
            this._placesSub.unsubscribe();
    }

}
