import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlaceModel } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { EditOfferFormViewModel } from '../view-models/edit-offer-form.view-model';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
    public place: PlaceModel;
    public model: EditOfferFormViewModel = new EditOfferFormViewModel();

    constructor(
        private _route: ActivatedRoute,
        private _placesService: PlacesService,
        private _navCtrl: NavController
    ) {
    }

    public ngOnInit() {
        this._route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this._navCtrl.navigateBack('/places/offers');
                return;
            }
            this.place = this._placesService.getPlace(paramMap.get('placeId'));
            this.model.initialize(this.place);
        });
    }

    public onEditOffer() {
        if (!this.model.form.valid) {
            return;
        }
        console.log(this.model.form)
    }

}
