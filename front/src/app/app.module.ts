import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CarnumListComponent } from './carnum-list/carnum-list.component';
import {CarnumApiService} from "./carnum-api.service";
import {HttpClientModule} from "@angular/common/http";
import { CarnumDetailComponent } from './carnum-detail/carnum-detail.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CarnumListComponent,
    CarnumDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CarnumApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
