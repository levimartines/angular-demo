import {Injectable} from '@angular/core';
import {catchError, Observable, retry} from "rxjs";
import {Customer} from "../models/customer";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  findAll(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.apiURL + '/customers')
      .pipe(retry(1), catchError(this.handleError));
  }

  save(customer: Customer) {
    return this.http.post(this.apiURL + '/customers', customer)
      .pipe(retry(1), catchError(this.handleError));
  }

}
