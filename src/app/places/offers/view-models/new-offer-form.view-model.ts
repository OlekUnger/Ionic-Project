import { FormControl, FormGroup, Validators } from '@angular/forms';

export class NewOfferFormViewModel {
    public form: FormGroup;
    constructor() {
        this.initialize();
    }

    public initialize() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                updateOn: 'blur', validators: [Validators.required]
            }),
            description: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
            }),
            price: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)]
            }),
            dateFrom: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            dateTo: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            })
        });
    }
}