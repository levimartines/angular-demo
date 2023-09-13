import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlateSearchComponent} from "./components/plate-search/plate-search.component";
import {CarDetailsComponent} from "./components/car-details/car-details.component";
import {CarRegisterComponent} from "./components/car-register/car-register.component";

const routes: Routes = [
  {
    path: '', component: PlateSearchComponent
  },
  {
    path: 'car', component: CarRegisterComponent
  },
  {
    path: 'car/:id', component: CarDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
