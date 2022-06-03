import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestExpressNavComponent } from './test-express-nav/test-express-nav.component';
import { CardComponent } from './card/card.component';
import { TestExpressTopNavComponent } from './test-express-top-nav/test-express-top-nav.component';
import { CreateComponent } from './test-express-top-nav/create/create.component';
import { MainprojectComponent } from './test-express-top-nav/mainproject/mainproject.component';

@NgModule({
  declarations: [
    AppComponent,
    TestExpressNavComponent,
    CardComponent,
    TestExpressTopNavComponent,
    CreateComponent,
    MainprojectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
