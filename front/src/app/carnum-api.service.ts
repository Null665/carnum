import { Injectable } from '@angular/core';
import {Carnum} from "./carnum";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CarnumApiService {

  readonly API_ENDPOINT = "http://127.0.0.1:8000/carnum/";

  constructor(private http: HttpClient) { }

  getCarNumbers(): Observable<Carnum[]> {
    return this.http.get<Carnum[]>(this.API_ENDPOINT);
  }

  create(carnum: Carnum): Observable<Carnum> {
    let url = this.API_ENDPOINT + "item/";
    return this.http.post<Carnum>(url, carnum, httpOptions)
  }

  update(carnum: Carnum): Observable<Carnum> {
    let url = this.API_ENDPOINT+"item/"+carnum.id+"/";
    return this.http.put<Carnum>(url, carnum, httpOptions)
  }

}
