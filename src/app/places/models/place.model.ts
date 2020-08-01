export class PlaceModel {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public imgUrl: string,
        public price: number,
        public availableFrom: Date,
        public availableTo: Date,
        public userId: string
    ) {}
}

export interface IPlace {
    id?: string;
    title: string;
    description: string;
    price: number;
    dateFrom: Date;
    dateTo: Date;
}
