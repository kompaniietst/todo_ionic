import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <app-header></app-header>

    <ion-content color="dark">
      <ion-grid class="ion-text-center ion-align-items-center">
        <div class="not-found">404</div>
        <div>Not found</div>
      </ion-grid>
    </ion-content>
  `,
  styles: [`
    ion-grid{
      height: 100%;
    }
    .not-found{
        font-size: 50px;
    }
  `],
})
export class NotFoundPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
