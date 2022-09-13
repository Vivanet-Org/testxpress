import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardComponent } from './card/card.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ReleaseComponent } from './release/release.component';

const routes: Routes = [
  {
    component:CardComponent,
    path:''
  },
  {
    component:ApplicationsComponent,
    path:'applications'
  },
  {
    component:ReleaseComponent,
    path:'release'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
