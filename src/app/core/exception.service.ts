import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  constructor() { }

  catchBadResponse: (err: HttpErrorResponse | any) => Observable<any> = (
    err: any | HttpErrorResponse
  ) => {
    let emsg = '';

    if (err.error instanceof Error) {
      emsg = `An error occurred: ${err.error.message}`;
    } else {
      emsg = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    console.error(emsg);
    return of(false)
  }
}
