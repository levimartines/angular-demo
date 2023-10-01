import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Car} from "../../models/car";
import {ServiceItem} from "../../models/service-item";
import {MatDialog} from "@angular/material/dialog";
import {ServiceRegisterDialogComponent} from "../service-register-dialog/service-register-dialog.component";
import {CarService} from "../../services/car.service";
import {Service} from "../../models/service";
import {ServicesService} from "../../services/services.service";
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
    private servicesService: ServicesService,
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

  getTotal(serviceItems: ServiceItem[] | undefined): string {
    const total = serviceItems?.reduce((a, b) => a + b.value!, 0);
    return total ? total.toString() : '0.00';
  }

  newService() {
    this.dialog.open(ServiceRegisterDialogComponent, {
      width: '90%',
      maxWidth: '90vw',
      data: {
        car: this.car
      }
    });
  }

  downloadDocument(service: Service) {
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
