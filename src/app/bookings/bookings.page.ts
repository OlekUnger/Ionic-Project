import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingModel } from './models/booking.model';
import { BookingService } from './services/booking.service';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
    public loadedBookings: BookingModel[];
    private _bookingsSub: Subscription;

    constructor(private _bookingService: BookingService, private _loadingCtrl: LoadingController) {
    }

    public ngOnInit(): void {
        this._bookingsSub = this._bookingService.bookings
            .subscribe((bookings: BookingModel[]) => {
                this.loadedBookings = bookings;
            });
    }

    public onCancelBooking(id: string, slidingBooking: IonItemSliding): void {
        slidingBooking.close();
        this._loadingCtrl.create({
            message: 'Cancelling...',
            spinner: 'circles'
        }).then(loadingEl => {
            loadingEl.present();
            this._bookingService.cancelBooking(id)
                .subscribe(() => loadingEl.dismiss())
        });
    }

    public ngOnDestroy(): void {
        if (this._bookingsSub) {
            this._bookingsSub.unsubscribe();
        }
    }

}
