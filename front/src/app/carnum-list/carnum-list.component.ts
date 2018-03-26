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
  carNumbers : Carnum[];
  selectedCarnum: Carnum;

  constructor(private carnumApi: CarnumApiService) { }

  ngOnInit() {
    this.getCarNumbers();
  }

  // Receive messages from detail component
  // and update list accordingly
  receiveMessage($event) {
    if($event.method === null || $event.carnum === null)
      return;

    if($event.method == 'POST')
      this.carNumbers.push($event.carnum);
    else if($event.method == 'DELETE') {
      for(let i=0;i<this.carNumbers.length;i++)
        if(this.carNumbers[i].id == $event.carnum.id) {
          this.carNumbers.splice(i, 1);
          break;
        }

    }
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
