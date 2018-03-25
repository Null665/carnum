import { Component, OnInit } from '@angular/core';
import {CarnumApiService} from "../carnum-api.service";
import {Carnum} from "../carnum";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-carnum-list',
  templateUrl: './carnum-list.component.html',
  styleUrls: ['./carnum-list.component.css']
})
export class CarnumListComponent implements OnInit {
  carNumbers : Carnum[];
  selectedCarnum: Carnum;

  constructor(private carnumApi: CarnumApiService) { }

  ngOnInit() {
    this.getCarNumbers();
  }

  // Get all car numbers from database
  getCarNumbers(): void {
    this.carnumApi.getCarNumbers().subscribe(carNumbers => this.carNumbers = carNumbers);
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