import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IPlace } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { NewOfferFormViewModel } from '../view-models/new-offer-form.view-model';

@Component({
    selector: 'app-new-offer',
    templateUrl: './new-offer.page.html',
    styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
    public model: NewOfferFormViewModel = new NewOfferFormViewModel();

    constructor(
        private _placesService: PlacesService,
        private _router: Router,
        private _loadingCtrl: LoadingController
    ) {
    }

    public ngOnInit() {
    }

    public onCreateOffer() {
        if (!this.model.form.valid) {
            return;
        }
        this._loadingCtrl.create({
            message: 'Creating place...',
            spinner: 'circles',
        }).then(loadingEl => {
            loadingEl.present();
            const newPlace: IPlace = this.model.getPlaceData(this.model.form.value);
            this._placesService.addPlace(newPlace).subscribe(() => {
                loadingEl.dismiss();
                this.model.form.reset();
                this._router.navigateByUrl('/places/offers');
            });
        });
    }
}
