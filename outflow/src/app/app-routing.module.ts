import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageInitialComponent } from './modules/home-page/page-initial/page-initial.component';
import { LoginComponent } from './modules/login/login.component';

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
