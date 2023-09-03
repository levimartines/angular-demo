import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlateSearchComponent} from "./plate-search/plate-search.component";
import {CarDetailsComponent} from "./car-details/car-details.component";

const routes: Routes = [
  {
    path: '', component: PlateSearchComponent
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
