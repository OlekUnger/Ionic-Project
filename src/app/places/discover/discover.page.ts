import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { PlaceModel } from '../models/place.model';
import { PlacesService } from '../services/places.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    public loadedPlaces: PlaceModel[];
    public listedLoadedPlaces: PlaceModel[];
    public relevantPlaces: PlaceModel[];
    private _placesSub: Subscription;

    constructor(
        private _placesService: PlacesService,
        private _menuCtrl: MenuController,
        private _authService: AuthService
    ) {
    }

    public ngOnInit(): void {
        this._placesSub = this._placesService.places
            .subscribe((places: PlaceModel[]) => {
                this.loadedPlaces = places;
                this.relevantPlaces = this.loadedPlaces;
                this.listedLoadedPlaces = this.relevantPlaces.slice(1);
            });
    }

    public onOpenMenu() {
        this._menuCtrl.toggle();
    }

    public onFilterUpdate(event: CustomEvent): void {
        if (event.detail.value === 'all') {
            this.relevantPlaces = this.loadedPlaces;
        } else {
            this.relevantPlaces = this.loadedPlaces.filter(i => i.userId !== this._authService.userId);
        }
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }

    public ngOnDestroy(): void {
        if (this._placesSub)
            this._placesSub.unsubscribe();
    }

}
