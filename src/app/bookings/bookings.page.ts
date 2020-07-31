import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { BookingModel } from './models/booking.model';
import { BookingService } from './services/booking.service';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    public loadedBookings: BookingModel[];

    constructor(private _bookingService: BookingService) {
    }

    public ngOnInit(): void {
        this.loadedBookings = this._bookingService.bookings;
    }

    public onCancelBooking(id: string, slidingBooking: IonItemSliding): void {
        slidingBooking.close();
    }

}
