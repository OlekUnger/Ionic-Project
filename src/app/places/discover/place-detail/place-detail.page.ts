import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { BookingService } from '../../../bookings/services/booking.service';
import { PlaceModel } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
    public place: PlaceModel;
    public isBookable: boolean = false;
    public isLoading: boolean = false;
    private _placeSub: Subscription;

    constructor(
        private _navCtrl: NavController,
        private _modalCtrl: ModalController,
        private _route: ActivatedRoute,
        private _placesService: PlacesService,
        private _actionSheetCtrl: ActionSheetController,
        private _bookingService: BookingService,
        private _loadingCtrl: LoadingController,
        private _authService: AuthService,
        private _alertCtrl: AlertController,
        private _router: Router
    ) {
    }

    public ngOnInit(): void {
        this._route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this._navCtrl.navigateBack('/places/offers');
                return;
            }
            this.isLoading = true;
            this._placeSub = this._placesService.getPlace(paramMap.get('placeId'))
                .subscribe((place: PlaceModel) => {
                    this.place = place;
                    this.isBookable = place.userId !== this._authService.userId;
                    this.isLoading = false;
                }, error => {
                    this._alertCtrl.create({
                        header: 'An error occurred.',
                        message: 'Could not load place.',
                        buttons: [{text: 'Okey', handler: () => this._router.navigateByUrl('/places/discover')}]
                    }).then(alertEl => alertEl.present());
                });
        });
    }

    public onBookPlace(): void {
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

    public openBookingModal(mode: 'select' | 'random'): void {
        this._modalCtrl.create({
            component: CreateBookingComponent,
            componentProps: {selectedPlace: this.place, selectedMode: mode}
        })
            .then((modalEl: HTMLIonModalElement) => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then(resultData => {
                if (resultData.role === 'confirm') {
                    this._loadingCtrl.create({
                        message: 'Booking place...',
                        spinner: 'circles'
                    }).then(loadingEl => {
                        loadingEl.present();
                        const data = resultData.data.bookingData;
                        this._bookingService.addBooking({
                                placeId: this.place.id,
                                placeTitle: this.place.title,
                                placeImage: this.place.imgUrl,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                guestNumber: data.guestNumber,
                                dateFrom: data.startDate,
                                dateTo: data.endDate
                            }
                        ).subscribe(() => loadingEl.dismiss());
                    });

                }
            });
    }

    public ngOnDestroy(): void {
        if (this._placeSub) {
            this._placeSub.unsubscribe();
        }
    }

}
