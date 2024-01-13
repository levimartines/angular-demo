import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, retry} from "rxjs";
import {Car} from "../models/car";
import {EstimateItem} from "../models/estimate-item";
import {Estimate} from "../models/estimate";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class CarService extends BaseService {

  private car = new BehaviorSubject<Car>({
    plate: '',
    estimates: [],
    id: 0,
    color: '',
    model: '',
    customer: {
      id: 0,
      name: '',
      address: '',
      comments: '',
      email: '',
      phone: ''
    },
    comments: ''
  });
  getCar = this.car.asObservable();

  setCar(car: Car) {
    this.car.next(car);
  }

  save(car: Partial<Car>) {
    return this.http
      .post<Car>(this.apiURL + '/cars', car)
      .pipe(retry(1), catchError(this.handleError));
  }

  newService(id: number, items: EstimateItem[]) {
    return this.http
      .post<Estimate>(`${this.apiURL}/cars/${id}/estimates`, items)
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

}
