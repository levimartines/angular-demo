import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidenavListComponent} from "./navigation/sidenav-list/sidenav-list.component";
import {ToolbarComponent} from "./navigation/toolbar/toolbar.component";
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlateSearchComponent} from './components/plate-search/plate-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { CustomerRegisterDialogComponent } from './components/customer-register-dialog/customer-register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PlateSearchComponent,
    SidenavListComponent,
    ToolbarComponent,
    CarDetailsComponent,
    CarRegisterComponent,
    CustomerRegisterDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
