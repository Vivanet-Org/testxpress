import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestExpressNavComponent } from './test-express-nav/test-express-nav.component';
import { CardComponent } from './card/card.component';
import { TestExpressTopNavComponent } from './test-express-top-nav/test-express-top-nav.component';
import { MainprojectComponent } from './mainproject/mainproject.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApplicationsComponent } from './applications/applications.component';

@NgModule({
  declarations: [
    AppComponent,
    TestExpressNavComponent,
    CardComponent,
    TestExpressTopNavComponent,
    MainprojectComponent,
    ApplicationsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
