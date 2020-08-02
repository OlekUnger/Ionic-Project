import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { BookingModel, IBooking, IBookingResponseModel } from '../models/booking.model';

@Injectable({providedIn: 'root'})
export class BookingService {
    private static readonly url: string = 'https://ionic-angular-course-3479c.firebaseio.com';
    private static readonly bookingsUrl: string = 'https://ionic-angular-course-3479c.firebaseio.com/bookings';
    private static readonly bookingsUrlExt: string = `${BookingService.bookingsUrl}.json`;
    private _bookings: BehaviorSubject<BookingModel[]> = new BehaviorSubject<BookingModel[]>([]);

    public get bookings(): Observable<BookingModel[]> {
        return this._bookings.asObservable();
    }

    constructor(private _authService: AuthService, private _http: HttpClient) {
    }

    public addBooking(booking: IBooking) {
        let generatedId: string;
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
        return this._http.post<{ name: string }>(BookingService.bookingsUrlExt, {...newBooking, id: null}).pipe(
            switchMap(response => {
                generatedId = response.name;
                return this.bookings;
            }),
            take(1),
            tap(bookings => {
                newBooking.id = generatedId;
                this._bookings.next(bookings.concat(newBooking));
            })
        );
    }

    public fetchBookings(): Observable<BookingModel[]> {
        return this._http.get<{ [key: string]: IBookingResponseModel }>(`${BookingService.bookingsUrlExt}?orderBy="userId"&equalTo="${this._authService.userId}"`)
            .pipe(
                map(bookingData => {
                    const bookings = [];
                    for (const key in bookingData) {
                        if (bookingData.hasOwnProperty(key)) {
                            bookings.push(new BookingModel(
                                key,
                                bookingData[key].placeId,
                                bookingData[key].userId,
                                bookingData[key].placeImg,
                                bookingData[key].placeTitle,
                                bookingData[key].firstName,
                                bookingData[key].lastName,
                                +bookingData[key].guestNumber,
                                new Date(bookingData[key].bookedFrom),
                                new Date(bookingData[key].bookedTo),
                            ));
                        }
                    }
                    return bookings;
                }),
                tap(bookings => this._bookings.next(bookings))
            );
    }

    public cancelBooking(bookingId: string) {
        return this._http.delete(`${BookingService.bookingsUrl}/${bookingId}.json`)
            .pipe(
                switchMap(() => this.bookings),
                take(1),
                tap(bookings => this._bookings
                    .next(bookings.filter(b => b.id !== bookingId)))
            );
    }
}
