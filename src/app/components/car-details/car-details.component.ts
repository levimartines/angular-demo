import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Car} from "../../models/car";
import {EstimateItem} from "../../models/estimate-item";
import {MatDialog} from "@angular/material/dialog";
import {EstimateRegisterDialogComponent} from "../estimate-register-dialog/estimate-register-dialog.component";
import {CarService} from "../../services/car.service";
import {Estimate} from "../../models/estimate";
import {EstimatesService} from "../../services/estimates.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
  providers: [DatePipe]
})
export class CarDetailsComponent {
  car: Car;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private servicesService: EstimatesService,
    public dialog: MatDialog,
    public pipe: DatePipe
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

  getTotal(serviceItems: EstimateItem[] | undefined): string {
    const total = serviceItems?.reduce((a, b) => a + b.price!, 0);
    return total ? total.toString() : '0.00';
  }

  newService() {
    this.dialog.open(EstimateRegisterDialogComponent, {
      width: '90%',
      maxWidth: '90vw',
      data: {
        car: this.car
      }
    });
  }

  downloadDocument(service: Estimate) {
    this.servicesService.downloadDocument(service?.id?.toString()).subscribe(res => {
      let url = window.URL.createObjectURL(res);
      let a = document.createElement('a');
      a.href = url;
      const todayFormatted = this.pipe.transform(Date.now(), 'dd/MM/yy');
      a.download = `orcamento_${this.car.plate}_${todayFormatted}`;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }
}
