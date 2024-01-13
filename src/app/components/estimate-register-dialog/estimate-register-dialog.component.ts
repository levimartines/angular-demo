import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstimateItem } from '../../models/estimate-item';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-service-register-dialog',
  templateUrl: './estimate-register-dialog.component.html',
  styleUrls: ['./estimate-register-dialog.component.scss']
})
export class EstimateRegisterDialogComponent {
  @ViewChild(MatTable) table: MatTable<any>;
  items: EstimateItem[] = [];
  displayedColumns: string[] = ['item', 'price', 'delete'];
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EstimateRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car },
    private carService: CarService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem() {
    const item: EstimateItem = this.form.value as EstimateItem;
    this.items.push(item);
    this.form.reset();
    this.table.renderRows();
  }

  getTotal(serviceItems: EstimateItem[]): string {
    const total = serviceItems?.reduce((a, b) => a + b.price!, 0);
    return total ? total.toString() : '0.00';
  }

  remove(itemToRemove: EstimateItem) {
    this.items = this.items.filter(item => item !== itemToRemove);
  }

  submit() {
    this.carService.newService(this.data.car.id, this.items).subscribe(res => {
      const car = this.data.car;
      car.estimates = [res].concat(car.estimates);
      this.carService.setCar(car);
      this.dialogRef.close();
    });
  }
}
