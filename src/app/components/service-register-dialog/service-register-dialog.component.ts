import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ServiceItem} from "../../models/service-item";
import {FormControl, FormGroup} from "@angular/forms";
import {MatTable} from "@angular/material/table";
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";

@Component({
  selector: 'app-service-register-dialog',
  templateUrl: './service-register-dialog.component.html',
  styleUrls: ['./service-register-dialog.component.scss']
})
export class ServiceRegisterDialogComponent {
  @ViewChild(MatTable) table: MatTable<any>;
  items: ServiceItem[] = [];
  displayedColumns: string[] = ['item', 'value', 'delete'];
  form = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<ServiceRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {car: Car},
    private carService:CarService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem() {
    const item: ServiceItem = this.form.value as ServiceItem;
    this.items.push(item);
    this.form.reset();
    this.table.renderRows();
  }

  getTotal(serviceItems: ServiceItem[]): string {
    const total = serviceItems?.reduce((a, b) => a + b.value!, 0);
    return total ? total.toString() : '0.00';
  }

  remove(itemToRemove: ServiceItem) {
    this.items = this.items.filter(item => item !== itemToRemove);
  }

  submit() {
    this.carService.newService(this.data.car.id, this.items).subscribe(res => {
      const car = this.data.car;
      car.services = [res].concat(car.services);
      this.carService.setCar(car)
      this.dialogRef.close();
    })
  }
}
