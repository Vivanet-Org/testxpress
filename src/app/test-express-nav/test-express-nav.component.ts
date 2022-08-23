import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-test-express-nav',
  templateUrl: './test-express-nav.component.html',
  styleUrls: ['./test-express-nav.component.css']
})
export class TestExpressNavComponent implements OnInit {

  testXpressImg: string = '/assets/images/App.png';
  pieChartImg: string = '/assets/images/inactive-pie-chart.png';
  activeFolderImg: string = '/assets/images/active-folder.png';
  inactiveAppImg: string = '/assets/images/inactive-app.png';
  inactiveRocketImg: string = '/assets/images/inactive-rocket.png';
  inactiveNotepadImg: string = '/assets/images/inactive-notepad.png';
  inactivePlayImg: string = '/assets/images/inactive-play.png';
  inactiveFileImg: string = '/assets/images/inactive-file.png';
  Line6Img: string = '/assets/images/Line6.png';
  inactiveGearImg: string = '/assets/images/inactive-gear.png';
  inactiveBellImg: string = '/assets/images/inactive-bell.png';
  inactiveQuestionImg: string = '/assets/images/inactive-question.png';
  iconAccountImg: string = '/assets/images/icon-account.png';

  constructor(public usersService:UsersService) { }

  projectsModal() {
    this.activeFolderImg = '/assets/images/active-folder.png';
    this.inactiveAppImg = '/assets/images/inactive-app.png';

    $('.topNav').css({
      'display': 'block'
    });

    $('.card-home').css({
      'display': 'block'
    });

    $('.appHome').css({
      'display': 'none'
    });

    $('.folderBg').css({
      'background-color': 'rgb(95, 93, 93)'
    });

    $('.windowsBg').css({
      'background-color': 'rgb(42, 42, 42)'
    });

    this.usersService.sendClickEvent();

  }

  applicationsModal() {
    this.activeFolderImg = '/assets/images/inactive-folder.png';
    this.inactiveAppImg = '/assets/images/active-app.png';

    $('.topNav').css({
      'display': 'none'
    });

    $('.card-home').css({
      'display': 'none'
    });

    $('.appHome').css({
      'display': 'block'
    });

    $('.folderBg').css({
      'background-color': 'rgb(42, 42, 42)'
    });

    $('.windowsBg').css({
      'background-color': 'rgb(95, 93, 93)'
    });

    this.usersService.sendClickEvent();

  }

  ngOnInit(): void {
  }

}
