import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SidenavListComponent} from "./navigation/sidenav-list/sidenav-list.component";
import {ToolbarComponent} from "./navigation/toolbar/toolbar.component";
import {MaterialModule} from "./shared/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlateSearchComponent} from './components/plate-search/plate-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CarDetailsComponent} from './components/car-details/car-details.component';
import {CarRegisterComponent} from './components/car-register/car-register.component';
import {
  CustomerRegisterDialogComponent
} from './components/customer-register-dialog/customer-register-dialog.component';
import {EstimateRegisterDialogComponent} from './components/estimate-register-dialog/estimate-register-dialog.component';
import {AuthRoutingModule} from './auth-routing.module';
import {registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { OktaAuthModule, OktaConfig } from '@okta/okta-angular';

const oktaConfig: OktaAuthOptions = {
  issuer: 'https://dev-10789051.okta.com/oauth2/default',
  clientId: '0oab99obojpDufh9X5d7',
  redirectUri: '/callback',
  scopes: ['openid', 'profile', 'email'],
};

const oktaAuth = new OktaAuth(oktaConfig);
const moduleConfig: OktaConfig = { oktaAuth };

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    PlateSearchComponent,
    SidenavListComponent,
    ToolbarComponent,
    CarDetailsComponent,
    CarRegisterComponent,
    CustomerRegisterDialogComponent,
    EstimateRegisterDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OktaAuthModule.forRoot(moduleConfig),
    AuthRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
