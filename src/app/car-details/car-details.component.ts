import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Car} from "../models/car";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent {
  car: Car;

  constructor(
    private router: Router,
  ) {
    this.car = this.router.getCurrentNavigation()?.extras.state as Car;
  }

}
