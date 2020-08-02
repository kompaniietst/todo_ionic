import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./auth/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./auth/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
