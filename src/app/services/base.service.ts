import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {throwError} from "rxjs";
import { AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  apiURL: string;

  protected constructor(protected http: HttpClient, private appConfig: AppConfig) {
    this.apiURL = appConfig.backend;
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
