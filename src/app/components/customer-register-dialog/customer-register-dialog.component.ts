import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';


@Component({
  selector: 'app-customer-register-dialog',
  templateUrl: './customer-register-dialog.component.html',
  styleUrls: ['./customer-register-dialog.component.scss']
})
export class CustomerRegisterDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl(''),
    comments: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CustomerRegisterDialogComponent>,
    private customerService: CustomerService
  ) {
  }

  submit() {
    const customer = this.form.value as Customer;
    this.customerService.save(customer).subscribe((res) => this.dialogRef.close(res));
  }

}
