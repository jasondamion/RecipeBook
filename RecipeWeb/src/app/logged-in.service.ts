import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn: Observable<boolean> = this._loggedIn.asObservable();
  constructor() {
   this._loggedIn.next(localStorage.getItem('token') != null)
   }

  logOut(){
    this._loggedIn.next(false);
  }

  logIn(){
    this._loggedIn.next(true);
  }

  isLoggedIn(){
    return this.loggedIn;
  }
}
