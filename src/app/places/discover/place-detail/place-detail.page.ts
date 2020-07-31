import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { PlaceModel } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
    public place: PlaceModel;

    constructor(
        private _navCtrl: NavController,
        private _modalCtrl: ModalController,
        private _route: ActivatedRoute,
        private _placesService: PlacesService,
        private _actionSheetCtrl: ActionSheetController
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

    public onBookPlace() {
        // this._navCtrl.navigateBack('/places/discover');
        this._actionSheetCtrl.create({
            header: 'Choose an action',
            buttons: [
                {
                    text: 'Select Date',
                    handler: () => {
                        this.openBookingModal('select');
                    }
                },
                {
                    text: 'Random Date',
                    handler: () => {
                        this.openBookingModal('random');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        }).then(actionSheetEl => {
            actionSheetEl.present();
        });

    }

    public openBookingModal(mode: 'select' | 'random') {
        console.log(mode)
        this._modalCtrl.create({
            component: CreateBookingComponent,
            componentProps: {selectedPlace: this.place}
        })
            .then((modalEl: HTMLIonModalElement) => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then(resultData => {
                console.log(resultData.data, resultData.role);
                if (resultData.role === 'confirm') {
                    console.log('booked');
                }
            });
    }

}
