import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PlaceModel } from '../models/place.model';
import { PlacesService } from '../services/places.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
    public loadedPlaces: PlaceModel[];

    constructor(private placesService: PlacesService, private _menuCtrl: MenuController) {
    }

    ngOnInit() {
        this.loadedPlaces = this.placesService.places;
    }

    public onOpenMenu() {
        this._menuCtrl.toggle();
    }

}
