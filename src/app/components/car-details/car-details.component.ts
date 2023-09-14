import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Car} from "../../models/car";
import {ServiceItem} from "../../models/service-item";
import {MatDialog} from "@angular/material/dialog";
import {ServiceRegisterDialogComponent} from "../service-register-dialog/service-register-dialog.component";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent {
  car: Car;

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.car = this.router.getCurrentNavigation()?.extras.state as Car;
  }

  getTotal(serviceItems: ServiceItem[] | undefined): string {
    const total = serviceItems?.reduce((a, b) => a + b?.value, 0);
    return total ? total.toString() : '0.00';
  }

  newService() {
    const dialogRef = this.dialog.open(ServiceRegisterDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      console.log('closed');
    });
  }
}
