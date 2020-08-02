import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PlaceModel } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { EditOfferFormViewModel } from '../view-models/edit-offer-form.view-model';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    public place: PlaceModel;
    public placeId: string;
    public model: EditOfferFormViewModel = new EditOfferFormViewModel();
    public isLoading: boolean = false;
    private _placeSub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _placesService: PlacesService,
        private _navCtrl: NavController,
        private _router: Router,
        private _loadingCtrl: LoadingController,
        private _alertCtrl: AlertController
    ) {
    }

    public ngOnInit(): void {
        this._route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this._navCtrl.navigateBack('/places/offers');
                return;
            }
            this.placeId = paramMap.get('placeId')
            this.isLoading = true;
            this._placeSub = this._placesService.getPlace(paramMap.get('placeId'))
                .subscribe((place: PlaceModel) => {
                    this.place = place;
                    this.model.initialize(this.place);
                    this.isLoading = false;
                }, error => {
                    this._alertCtrl.create({
                        header: 'An error occurred. ',
                        message: 'Place could not be fetched. Please try again later.',
                        buttons: [{text: 'Okey', handler: () => this._router.navigateByUrl('/places/offers')}]
                    }).then(alertEl => alertEl.present());
                });
        });
    }

    public onEditOffer(): void {
        if (!this.model.form.valid) {
            return;
        }
        this._loadingCtrl.create({
            message: 'Updating place...',
            spinner: 'circles'
        }).then(loadingEl => {
            loadingEl.present();
            const editedPlace = {...this.place};
            editedPlace.title = this.model.form.value.title;
            editedPlace.description = this.model.form.value.description;
            this._placesService.updatePlace(editedPlace).subscribe(() => {
                loadingEl.dismiss();
                this.model.form.reset();
                this._router.navigateByUrl('/places/offers');
            });
        });
    }

    public ngOnDestroy(): void {
        if (this._placeSub) {
            this._placeSub.unsubscribe();
        }
    }

}
