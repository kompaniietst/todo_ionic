import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('input') input;

  authError: any;

  constructor(private auth: AuthService) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.input.setFocus(), 150);
  }

  ngOnInit() {
    this.auth.eventAuthError$
      .subscribe(data => {
        this.authError = data;
      })
  }

  signIn(signInFormValue: any) {
    const user = new User(signInFormValue.email, signInFormValue.password);
    this.auth.login(user);
  }
}
