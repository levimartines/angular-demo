import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../../models/car";
import {ServiceItem} from "../../models/service-item";
import {MatDialog} from "@angular/material/dialog";
import {ServiceRegisterDialogComponent} from "../service-register-dialog/service-register-dialog.component";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent {
  car: Car;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService :CarService,
    public dialog: MatDialog,
  ) {
    carService.getCar.subscribe(car => {
      if (car.id !== 0) {
        this.car = car;
      } else {
        this.route.params.subscribe(params => {
          const id = params['id'];
          this.carService.findById(id).subscribe(res => this.car = res);
        })
      }
    });
  }

  getTotal(serviceItems: ServiceItem[] | undefined): string {
    const total = serviceItems?.reduce((a, b) => a + b.value!, 0);
    return total ? total.toString() : '0.00';
  }

  newService() {
    const dialogRef = this.dialog.open(ServiceRegisterDialogComponent, {
      width: '90%',
      maxWidth: '90vw',
      data: {
        car: this.car
      }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
