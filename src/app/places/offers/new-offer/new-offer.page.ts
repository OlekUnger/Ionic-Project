import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewOfferFormViewModel } from '../view-models/new-offer-form.view-model';

@Component({
    selector: 'app-new-offer',
    templateUrl: './new-offer.page.html',
    styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
    public model: NewOfferFormViewModel = new NewOfferFormViewModel();

    constructor() {
    }

    public ngOnInit() {
    }

    public onCreateOffer() {
      console.log(this.model.form)
    }
}
