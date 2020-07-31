import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';

@Injectable({providedIn: 'root'})
export class BookingService {
    private _bookings: BookingModel[] = [
        {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Manhattan Mansion',
            guestNumber: 2,
            userId: 'abc'
        }
    ];

    public get bookings() {
        return this._bookings;
    }
}
