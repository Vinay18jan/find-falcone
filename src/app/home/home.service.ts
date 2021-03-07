import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Falcone } from '../model/falcone.model';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../core/exception.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _URL = 'https://findfalcone.herokuapp.com';
  token;
  vehiclesS;

  private _falconeSubject = new BehaviorSubject(new Falcone());
  falconeState = this._falconeSubject.asObservable(); 

  private catchHttpErrors = () => (source$: Observable<any>) =>
    source$.pipe(
      catchError(this.exceptionService.catchBadResponse)
    );

  constructor(private _http: HttpClient, private exceptionService: ExceptionService,) { }

  getToken() {
    return this._http.post(`${this._URL}/token`, {}).pipe(this.catchHttpErrors());
      //.subscribe(res => this.token = res['token']);
  }

  getPlanets() {
    return this._http.get(`${this._URL}/planets`);
  }

  getVehicles() {
    return this._http.get(`${this._URL}/vehicles`);
  }

  push(destination: number, type: string, value: string) {
    let exisitngFalcone: Falcone = new Falcone();
    exisitngFalcone = this._falconeSubject.getValue();
    if(type === 'planet' && value === '') exisitngFalcone.planet_names.splice(destination, 1);
    else if(type === 'planet') exisitngFalcone.planet_names[destination] = value; 
    else if(type === 'vehicle') exisitngFalcone.vehicle_names[destination] = value;
    else exisitngFalcone.token = value;

    this._falconeSubject.next(exisitngFalcone);
  }

  findFalcone(body) {
    return this._http.post(`${this._URL}/find`, body).pipe(this.catchHttpErrors());
  }
}
