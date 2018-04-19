import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { AllauthorComponent } from './allauthor/allauthor.component';
import { NewauthorComponent } from './newauthor/newauthor.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { ViewComponent } from './view/view.component';
import { NewquoteComponent } from './newquote/newquote.component';


@NgModule({
  declarations: [
    AppComponent,
    AllauthorComponent,
    NewauthorComponent,
    EditauthorComponent,
    ViewComponent,
    NewquoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
