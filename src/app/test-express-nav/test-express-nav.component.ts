import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

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
  inactiveLineImg: string = '/assets/images/inactive-line.png'
  inactiveGearImg: string = '/assets/images/inactive-gear.png';
  inactiveBellImg: string = '/assets/images/inactive-bell.png';
  inactiveQuestionImg: string = '/assets/images/inactive-question.png';
  iconAccountImg: string = '/assets/images/icon-account.png';

  routeUrl: string = '';

  constructor() { }

  projectsModal() {
    this.activeFolderImg = '/assets/images/active-folder.png';
    this.inactiveAppImg = '/assets/images/inactive-app.png';

    $('.folderBg').css({
      'background-color': '#464755'
    });
    $('.windowsBg').css({
      'background-color': ''
    });
  }

  applicationsModal() {
    this.activeFolderImg = '/assets/images/inactive-folder.png';
    this.inactiveAppImg = '/assets/images/active-app.png';

    $('.folderBg').css({
      'background-color': ''
    });
    $('.windowsBg').css({
      'background-color': '#464755'
    });
  }

  ngOnInit(): void {
    this.routeUrl = window.location.href.slice(22);
    console.log(this.routeUrl);
    if(this.routeUrl == ''){
      this.projectsModal();
    }
    if(this.routeUrl == 'applications'){
      this.applicationsModal();
    }
  }

}
