import { Component } from '@angular/core';
import { Card }   from './card/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cards: Card[] = [{
    id: 1,
    description: 'First Card'
  },
  {
    id: 2,
    description: 'Second Card'
  }];
}
