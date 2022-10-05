import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './modules/doctor/doctor.component';
import { PageInitialComponent } from './modules/home-page/page-initial/page-initial.component';
import { LoginComponent } from './modules/login/login.component';
import { PacientComponent } from './modules/pacient/pacient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/inicial',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'pacient',
    component: PacientComponent
  },
  {
    path: 'doctor',
    component: DoctorComponent
  },

  {
    path: 'menu',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
