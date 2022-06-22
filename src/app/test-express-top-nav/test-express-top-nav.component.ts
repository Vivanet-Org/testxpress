import { Component, OnInit } from '@angular/core';
// import { MainprojectComponent } from '../mainproject/mainproject.component';
import * as $ from "jquery";

@Component({
  selector: 'app-test-express-top-nav',
  templateUrl: './test-express-top-nav.component.html',
  styleUrls: ['./test-express-top-nav.component.css']
})
export class TestExpressTopNavComponent implements OnInit {

  constructor() { }

  openModal() {
    $('.bg-modal').css({
      'display': 'grid'
    });
  }

  ngOnInit(): void {
  }

}
