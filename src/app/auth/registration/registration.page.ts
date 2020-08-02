import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, AfterViewInit {

  @ViewChild('input') input;

  authError: any;

  constructor(private auth: AuthService) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.input.setFocus(), 150);
  }

  ngOnInit() {
    this.auth.eventAuthError$
      .subscribe(data => this.authError = data)
  }

  registerUser(userRegFormValue) {
    const newUser = new User(userRegFormValue.email, userRegFormValue.password);
    this.auth.registerUser(newUser);
  }
}
