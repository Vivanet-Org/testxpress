import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-test-express-nav',
  templateUrl: './test-express-nav.component.html',
  styleUrls: ['./test-express-nav.component.css']
})
export class TestExpressNavComponent implements OnInit {

  appImgPath: any;

  constructor(public usersService:UsersService) { 
    this.loadData();
  }

  loadData(){
    this.appImgPath = '/assets/images/applications.png';
  }

  projectsModal() {
    $('.topNav').css({
      'display': 'block'
    });
    $('.home').css({
      'display': 'block'
    });
    $('.appHome').css({
      'display': 'none'
    });

    $('.folderBg').css({
      'background-color': 'rgb(95, 93, 93)'
    });
    $('.folderIcon').css({
      'color': 'white'
    });
    $('.windowsBg').css({
      'background-color': 'rgb(42, 42, 42)'
    });
    $('.appImg').css({
      'background-color': ''
    });

    this.usersService.sendClickEvent();

  }

  applicationsModal() {
    $('.topNav').css({
      'display': 'none'
    });
    $('.home').css({
      'display': 'none'
    });
    $('.appHome').css({
      'display': 'block'
    });

    $('.folderBg').css({
      'background-color': 'rgb(42, 42, 42)'
    });
    $('.folderIcon').css({
      'color': 'grey'
    });

    $('.windowsBg').css({
      'background-color': 'rgb(95, 93, 93)'
    });
    $('.appImg').css({
      'background-color': 'white'
    });
  }

  ngOnInit(): void {
  }

}
