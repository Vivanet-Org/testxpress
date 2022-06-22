import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-mainproject',
  templateUrl: './mainproject.component.html',
  styleUrls: ['./mainproject.component.css']
})
export class MainprojectComponent implements OnInit {

  constructor() { }

 
  closeModal() {
    $('.bg-modal').css({
      'display': 'none'
    });
  }

  ngOnInit(): void {
  }

}
