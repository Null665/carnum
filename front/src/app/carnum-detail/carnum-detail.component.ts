import {Component, Input, OnInit} from '@angular/core';
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

  save(): void {
    if(this.carnum.id == null) {
       console.log("create");
      this.api.create(this.carnum).subscribe();
    }
    else {
      console.log("update");
      this.api.update(this.carnum).subscribe();
    }
  }

  delete() {
    this.api.delete(this.carnum).subscribe();
  }

}
