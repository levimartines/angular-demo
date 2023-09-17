import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OktaAuth, OktaAuthOptions} from '@okta/okta-auth-js';
import {AuthInterceptor} from './shared/okta/auth.interceptor';
import {PlateSearchComponent} from "./components/plate-search/plate-search.component";
import {CarRegisterComponent} from "./components/car-register/car-register.component";
import {CarDetailsComponent} from "./components/car-details/car-details.component";

const oktaConfig: OktaAuthOptions = {
  issuer: 'https://dev-10789051.okta.com/',
  clientId: '0oab99obojpDufh9X5d7',
  redirectUri: '/callback',
  scopes: ['openid', 'profile', 'groups', 'email', 'okta.roles.read'],
};

const oktaAuth = new OktaAuth(oktaConfig);

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
    OktaAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
