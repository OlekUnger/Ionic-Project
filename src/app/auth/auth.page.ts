import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    public isLoading: boolean = false;
    public isLoginMode: boolean = true;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _loadingCtrl: LoadingController
    ) {
    }

    public ngOnInit() {
    }

    public onLogin() {
        this.isLoading = true;
        this._loadingCtrl.create({
            spinner: 'circles',
            keyboardClose: true, message: 'Logging in ...'
        }).then((loadingEl: HTMLIonLoadingElement): void => {
            loadingEl.present();
            setTimeout(() => {
                this.isLoading = false;
                loadingEl.dismiss();
                this._router.navigateByUrl('/places/discover');
            }, 1500);
        });
        this._authService.login();

    }

    public onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        console.log(email, password)

        if (this.isLoginMode) {
            // send request to login
        } else {
            // send request to signup
        }

    }

    public onSwitchAuthMode() {
        this.isLoginMode = !this.isLoginMode;
    }

}
