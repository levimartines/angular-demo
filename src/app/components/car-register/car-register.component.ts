import {Component} from '@angular/core';
import {CarService} from "../../services/car.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer";
import {MatDialog} from "@angular/material/dialog";
import {CustomerRegisterDialogComponent} from "../customer-register-dialog/customer-register-dialog.component";
import {Car} from "../../models/car";


@Component({
  selector: 'app-car-register',
  templateUrl: './car-register.component.html',
  styleUrls: ['./car-register.component.scss']
})
export class CarRegisterComponent {
  plate = '';
  form = new FormGroup({
    plate: new FormControl('', [Validators.required]),
    model: new FormControl(''),
    color: new FormControl(''),
    comments: new FormControl(''),
    customerId: new FormControl(''),
  });
  customers: Customer[] = [];

  constructor(
    private carService: CarService,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.plate = this.router.getCurrentNavigation()?.extras.state?.['plate'];
    this.form.controls['plate'].setValue(this.plate);
    this.form.controls['plate'].disable();
    this.loadCustomers();
  }

  submit() {
    const formValue = this.form.value;
    const car = {
      plate: this.plate,
      comments: formValue.comments,
      model: formValue.model,
      color: formValue.color,
      customer: { id: formValue.customerId} as Partial<Customer>,
    } as Car;
    this.carService.save(car).subscribe(res => {
      this.carService.findById(res.id.toString()).subscribe(carResponse => {
        this.router.navigate([`/car/${carResponse.id}`], { state: carResponse });
      });
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerRegisterDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadCustomers();
    });
  }

  loadCustomers() {
    this.customerService.findAll().subscribe(res => this.customers = res);
  }

}
