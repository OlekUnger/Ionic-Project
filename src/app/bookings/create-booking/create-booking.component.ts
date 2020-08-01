import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlaceModel } from '../../places/models/place.model';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
    @Input() public selectedPlace: PlaceModel;
    @Input() public selectedMode: 'select' | 'random';
    @ViewChild('form') public form: NgForm;
    public startDate: string;
    public endDate: string;

    constructor(private _modalCtrl: ModalController) {
    }

    public ngOnInit() {
        const availableFrom = new Date(this.selectedPlace.availableFrom);
        const availableTo = new Date(this.selectedPlace.availableTo);

        if (this.selectedMode === 'random') {
            this.startDate = new Date(availableFrom.getTime() + Math.random() *
                (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())).toISOString();

            this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() *
                (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())).toISOString();

        }
    }

    public onCancel() {
        this._modalCtrl.dismiss(null, 'cancel');
    }

    public onBookPlace() {
        if (!this.form.valid || !this.datesValid) {
            return;
        }

        this._modalCtrl.dismiss({
            bookingData: {
                firstName: this.form.value['first-name'],
                lastName: this.form.value['last-name'],
                guestNumber: +this.form.value['guest-number'],
                startDate: new Date(this.form.value['date-from']),
                endDate: new Date(this.form.value['date-to'])
            }
        }, 'confirm');
    }

    public datesValid(form: NgForm = this.form) {
        const startDate = new Date(form.value['date-from']);
        const endDate = new Date(form.value['date-to']);
        return endDate > startDate;
    }

}
