import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../services/car.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plate-search',
  templateUrl: './plate-search.component.html',
  styleUrls: ['./plate-search.component.scss']
})
export class PlateSearchComponent {

  constructor(
    private service: CarService,
    private router: Router,
  ) {
  }

  form = new FormGroup({
    plate: new FormControl('', [Validators.required])
  });

  submit() {
    const plate = this.form.value.plate ? this.form.value.plate : '';
    this.service.findByPlate(plate).subscribe(res => {
      if (res) {
        this.router.navigate([`/car/${res.id}`], { state: res });
      } else {
        this.router.navigate([`/car`], { state: {plate} });
      }
    });
  }
}
