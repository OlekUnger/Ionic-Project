import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlaceModel } from '../../models/place.model';

export class EditOfferFormViewModel {
    public form: FormGroup;

    constructor() {
        this.initialize();
    }

    public initialize(data?: PlaceModel) {
        this.form = new FormGroup({
            title: new FormControl(data ? data.title : null, {
                updateOn: 'blur', validators: [Validators.required]
            }),
            description: new FormControl(data ? data.description : null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
            }),
        });
    }
}
