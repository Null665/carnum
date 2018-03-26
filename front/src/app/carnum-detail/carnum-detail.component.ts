import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Carnum} from "../carnum";
import {CarnumApiService} from "../carnum-api.service";

@Component({
  selector: 'app-carnum-detail',
  templateUrl: './carnum-detail.component.html',
  styleUrls: ['./carnum-detail.component.css']
})
export class CarnumDetailComponent implements OnInit {
  @Input() carnum: Carnum;

  constructor(private api: CarnumApiService) { }

  ngOnInit() {
  }

  @Output() messageEvent = new EventEmitter<object>();
  sendMessage(obj: object) {
    this.messageEvent.emit(obj);
  }


  save(): void {
    if(this.carnum.id == null) {
      this.api.create(this.carnum).subscribe(carnum =>this.sendMessage({
        method: 'POST',
        carnum: carnum,
      }));
    }
    else {
      this.api.update(this.carnum).subscribe();
    }
  }

  delete() {
    this.api.delete(this.carnum).subscribe(carnum =>this.sendMessage({
        method: 'DELETE',
        carnum: this.carnum,
      }));
  }

}
