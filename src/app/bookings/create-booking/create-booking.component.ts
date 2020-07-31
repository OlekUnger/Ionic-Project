import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlaceModel } from '../../places/models/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() public selectedPlace: PlaceModel;

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {}

  public onCancel() {
    this._modalCtrl.dismiss(null, 'cancel')
  }

  public onBookPlace() {
    this._modalCtrl.dismiss({message: 'this is a dummy message'}, 'confirm');
  }

}
