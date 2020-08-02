import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  private currUserBehaviorSubject = new BehaviorSubject<User>(null);
  currUser = this.currUserBehaviorSubject.asObservable();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.authorizeIfUserExistInLocalstorage();
  }

  authorizeIfUserExistInLocalstorage() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      this.currUserBehaviorSubject.next(user);
    }
  }

  get isAuthorized() {
    return this.currUserBehaviorSubject.value ? true : false;
  }

  registerUser(user: User) {
    this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {

        if (userCredential)
          this.router.navigate(["/home"])
      })
      .catch(error => {
        this.eventAuthError.next(error);
      })
  }

  login(user: User) {
    this.fireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {

        if (userCredential) {
          let newUser = {
            id: userCredential.user.uid,
            email: user.email
          }

          this.setToLocalstorage(newUser);
          this.pushUserToBehaviorSubject(newUser);

          this.router.navigate(["/home"]);
        }
        else this.setToLocalstorage(null);
      })
      .catch(error => {
        this.eventAuthError.next(error);
      })
  }

  logout() {
    localStorage.removeItem('user');
    this.pushUserToBehaviorSubject(null);
    this.router.navigate(["/auth"]);
    return this.fireAuth.signOut();
  }

  setToLocalstorage(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  pushUserToBehaviorSubject(user: User) {
    this.currUserBehaviorSubject.next(user);
  }
}

