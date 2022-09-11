import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardComponent } from './card/card.component';
import { ApplicationsComponent } from './applications/applications.component';

const routes: Routes = [
  {
    component:CardComponent,
    path:''
  },
  {
    component:ApplicationsComponent,
    path:'applications'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
