import { Component, OnInit } from '@angular/core';
import {CarnumApiService} from "../carnum-api.service";
import {Carnum} from "../carnum";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-carnum-list',
  templateUrl: './carnum-list.component.html',
  styleUrls: ['./carnum-list.component.css'],
})
export class CarnumListComponent implements OnInit {
  selectedCarnum: Carnum;
  carNumbers: Observable<Carnum[]>;

  constructor(private carnumApi: CarnumApiService) {}

  ngOnInit() {
    this.carNumbers = this.carnumApi.getCarNumbers();
  }

  // user clicks an item, item gets used by 'detail' component
  selectCarNum(carnum: Carnum) {
    this.selectedCarnum = carnum;
  }

  // Give detail view an empty item, which means creating a new item
  newItemForm() {
    this.selectedCarnum = {id: null, user: null, number: null};
  }


}
