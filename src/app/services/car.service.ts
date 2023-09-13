import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Car} from "../models/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiURL = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  save(car: Partial<Car>) {
    return this.http
      .post<Car>(this.apiURL + '/cars', car)
      .pipe(retry(1), catchError(this.handleError));
  }

  findById(id: string): Observable<Car> {
    return this.http
      .get<Car>(this.apiURL + '/cars', {params: {id}})
      .pipe(retry(1), catchError(this.handleError));
  }

  findByPlate(plate: string): Observable<Car> {
    return this.http
      .get<Car>(this.apiURL + '/cars', {params: {plate}})
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
