import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Carnum} from "../carnum";
import {CarnumApiService} from "../carnum-api.service";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-carnum-detail',
  templateUrl: './carnum-detail.component.html',
  styleUrls: ['./carnum-detail.component.css']
})
export class CarnumDetailComponent implements OnInit {
  @Input() carnum: Carnum;
  errors: string;

  constructor(private api: CarnumApiService) { }

  ngOnInit() {
  }

  @Output() messageEvent = new EventEmitter<object>();
  sendMessage(obj: object) {
    this.messageEvent.emit(obj);
  }

  clearErrors(): void {
    this.errors = null;
  }


  save(): void {
    this.clearErrors();
    if(this.carnum.id == null) {
      this.api.create(this.carnum).pipe( catchError(this.handleError('create', null))).
      subscribe(carnum =>this.sendMessage({
        method: 'POST',
        carnum: carnum,
      }));
    }
    else {
      this.api.update(this.carnum).pipe( catchError(this.handleError('update', null))).
      subscribe()
    }
  }

  delete() {
    this.clearErrors();
    this.api.delete(this.carnum).pipe( catchError(this.handleError('delete', null))).
    subscribe(carnum =>this.sendMessage({
        method: 'DELETE',
        carnum: this.carnum,
      }));
  }

  // Bad, only displays one specific error type
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.log(error.error.non_field_errors);
    this.errors = error.error;

    return of(result as T);
  };
}
}
