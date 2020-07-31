import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private _platform: Platform,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      this._statusBar.styleDefault();
      this._splashScreen.hide();
    });
  }

  public onLogout() {
    this._authService.logout();
    this._router.navigateByUrl('/auth');
  }
}
