import { Injectable } from '@angular/core';
import {Carnum} from "./carnum";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CarnumApiService {

  readonly API_ENDPOINT = "/carnum/";
  private data: BehaviorSubject<Carnum[]> = new BehaviorSubject([]);
  errors: BehaviorSubject<{}> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    console.log("service construct");
    this.http.get<Carnum[]>(this.API_ENDPOINT).subscribe(data =>this.data.next(data));
  }

  getCarNumbers(): Observable<Carnum[]> {
    return this.data.asObservable();
  }


  create(carnum: Carnum): Observable<Carnum> {
    this.clearErrors();

    let url = this.API_ENDPOINT + "item/";
    let obs =  this.http.post<Carnum>(url, carnum, httpOptions)
      .pipe( catchError(this.handleError('create', null)));
    obs.subscribe(newCarNum =>{
      if(newCarNum)
        this.data.getValue().push((newCarNum));
      this.data.next(this.data.getValue());
    });
    return obs;
  }

  update(carnum: Carnum): Observable<Carnum> {
    this.clearErrors();

    let url = this.API_ENDPOINT+"item/"+carnum.id+"/";
    let obs = this.http.put<Carnum>(url, carnum, httpOptions)
      .pipe( catchError(this.handleError('update', null)));
    return obs;
  }

  delete(carnum: Carnum): Observable<Carnum> {
    this.clearErrors();

    let url = this.API_ENDPOINT+"item/"+carnum.id+"/";
    let obs =  this.http.delete<Carnum>(url)
      .pipe( catchError(this.handleError('delete', null)));
      obs.subscribe(nothing =>{

        for(let i=0;i<this.data.getValue().length;i++)
          if(this.data.getValue()[i].id == carnum.id) {
            this.data.getValue().splice(i, 1);
            break;
        }

        obs.pipe( catchError(this.handleError('delete', null)));

        this.data.next(this.data.getValue());
    });
    return obs;
  }

  // Error handling

  getErrors() {
    return this.errors.asObservable();
  }

    // Bad, only displays one specific error type
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    //console.log(error.error.non_field_errors);
    console.error("ERRO HAND");
    this.errors.next(error.error);

    return of(result as T);
    };
  }

  private clearErrors(): void {
    this.errors.next(null);
  }
}
