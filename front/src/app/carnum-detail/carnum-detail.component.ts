import {Component, Input, OnInit} from '@angular/core';
import {Carnum} from "../carnum";
import {CarnumApiService} from "../carnum-api.service";
import {Observable} from "rxjs/Observable";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-carnum-detail',
  templateUrl: './carnum-detail.component.html',
  styleUrls: ['./carnum-detail.component.css']
})
export class CarnumDetailComponent implements OnInit {
  @Input() carnum: Carnum;
  errors: Observable<{}>;

  constructor(private api: CarnumApiService) { }

  ngOnInit() {
    this.errors = this.api.getErrors();
  }

  save(): void {
    if(this.carnum.id == null) {
      this.api.create(this.carnum);
    }
    else {
      this.api.update(this.carnum);
    }
  }

  delete() {
    this.api.delete(this.carnum);
  }

}
