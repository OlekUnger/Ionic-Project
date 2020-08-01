import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { BookingModel, IBooking } from '../models/booking.model';

@Injectable({providedIn: 'root'})
export class BookingService {
    private _bookings: BehaviorSubject<BookingModel[]> = new BehaviorSubject<BookingModel[]>([]);

    public get bookings(): Observable<BookingModel[]> {
        return this._bookings.asObservable();
    }

    constructor(private _authService: AuthService) {
    }

    public addBooking(booking: IBooking): Observable<BookingModel[]> {
        const newBooking = new BookingModel(
            Math.random().toString(),
            booking.placeId,
            this._authService.userId,
            booking.placeImage,
            booking.placeTitle,
            booking.firstName,
            booking.lastName,
            booking.guestNumber,
            booking.dateFrom,
            booking.dateTo
        );
        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap(bookings => {
                this._bookings.next(bookings.concat(newBooking));
            })
        );
    }

    public cancelBooking(bookingId: string) {
        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap(bookings => {
                this._bookings.next(bookings.filter(b => b.id !== bookingId));
            })
        );
    }
}
