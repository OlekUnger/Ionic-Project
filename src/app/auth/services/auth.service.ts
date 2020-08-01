import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated: boolean = true;
  private _userId: string = 'xyz';

  public get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  public get userId() {
    return this._userId;
  }

  constructor() { }

  public login() {
    this._userIsAuthenticated = true;
  }

  public logout() {
    this._userIsAuthenticated = false;
  }


}
