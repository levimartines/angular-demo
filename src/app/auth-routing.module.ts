import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/okta/auth.interceptor';
import { PlateSearchComponent } from './components/plate-search/plate-search.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  {
    path: 'search', component: PlateSearchComponent
  },
  {
    path: 'car', component: CarRegisterComponent
  },
  {
    path: 'car/:id', component: CarDetailsComponent
  },
  {
    path: 'callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
