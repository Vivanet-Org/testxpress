import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

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

  event$;
  routeUrl: string = '';

  constructor(private router: Router) {
    console.log(router.url);
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        console.log(event.url);
        this.routeUrl =  event.url;
        this.clearCss();
        this.routingPath();        
      }
    });
  }
  
  routingPath(){
    console.log(this.routeUrl);
    switch (this.routeUrl) {
      case '/':
        this.projectsModal();
        break;
      case '/applications':
        this.applicationsModal();
        break;
      case '/release':
        this.releaseModal();
    }
  }

  projectsModal() {
    this.activeFolderImg = '/assets/images/active-folder.png';
    $('.folderBg').css({
      'background-color': '#464755'
    });
  }

  applicationsModal() {
    this.inactiveAppImg = '/assets/images/active-app.png';
    $('.windowsBg').css({
      'background-color': '#464755'
    });   
  }

  releaseModal() {
    this.inactiveRocketImg = '/assets/images/active-rocket.png';
    $('.rocketBg').css({
      'background-color': '#464755'
    });
  }

  clearCss(){
    this.activeFolderImg = '/assets/images/inactive-folder.png';
    this.inactiveAppImg = '/assets/images/inactive-app.png';
    this.inactiveRocketImg = '/assets/images/inactive-rocket.png';
    $('.folderBg').css({
      'background-color': ''
    });
    $('.windowsBg').css({
      'background-color': ''
    });
    $('.rocketBg').css({
      'background-color': ''
    });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

}
