import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  imagePath: any;

  constructor() {
    this.loadData();
  }

  loadData(){
    this.imagePath = '/assets/images/android.png';
  }
  
  data1: any = {};
  data2: any = {};
  totalProjects: any = {} = 0;
  flag: any = false;

  openModal() {
    $('.create-app-modal').css({
      'display': 'grid'
    });
  }

  closeModal() {
    $('.create-app-modal').css({
      'display': 'none'
    });
  }
  
  ngOnInit(): void {
  }

}
