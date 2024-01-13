import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstimatesService extends BaseService {

  downloadDocument(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    return this.http
      .get(`${this.apiURL}/estimates/${id}/download`, { headers, responseType: 'blob'})
      .pipe(catchError(this.handleError));
  }

}
