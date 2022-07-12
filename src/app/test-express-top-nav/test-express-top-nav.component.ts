import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-test-express-top-nav',
  templateUrl: './test-express-top-nav.component.html',
  styleUrls: ['./test-express-top-nav.component.css']
})
export class TestExpressTopNavComponent implements OnInit {

  clickEventSubscription:Subscription;

  data: any = {};
  totalProjects: any = {} = 0;

  constructor(private user:UsersService) {
    this.clickEventSubscription = this.user.getClickEvent().subscribe(() => {
      this.loadTotalProjectsNum();
    });
     this.loadTotalProjectsNum();
  }
  openModal() {
    $('.bg-modal').css({
      'display': 'grid'
    });
  }

  ngOnInit(): void {
  }

  loadTotalProjectsNum(){
    this.user.getData().subscribe(data => {
      this.data = data;
      this.totalProjects = Object.keys(data).length;
      console.warn(this.totalProjects);
      for (let index = 0; index < this.data.length; index++) {
        if(this.data[index].deleted == true){
          this.totalProjects--;
        }
      }
      console.warn(this.totalProjects);
    });
  }

}
