export class BookingModel {
    constructor(
        public id: string,
        public placeId: string,
        public userId: string,
        public placeImg: string,
        public placeTitle: string,
        public firstName: string,
        public lastName: string,
        public guestNumber: number,
        public bookedFrom: Date,
        public bookedTo: Date
    ) {}
}

export interface IBooking {
    placeId: string;
    placeTitle: string;
    placeImage: string;
    firstName: string;
    lastName: string;
    guestNumber: number;
    dateFrom: Date;
    dateTo: Date;
}

export interface IBookingResponseModel {
    bookedFrom: string;
    bookedTo: string;
    firstName: string;
    lastName: string;
    placeId: string;
    placeImg: string;
    placeTitle: string;
    userId: string;
    guestNumber: number;
}
