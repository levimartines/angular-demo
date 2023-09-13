import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiURL = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.apiURL + '/customers')
      .pipe(retry(1), catchError(this.handleError));
  }

  save(customer: Customer) {
    return this.http.post(this.apiURL + '/customers', customer)
  .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
