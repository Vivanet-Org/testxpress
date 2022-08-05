import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  clickEventSubscription:Subscription;

  appsImgPath: string = '/assets/images/apps.png';
  androidPath: string = '/assets/images/android.png';
  appImgPath: string = '/assets/images/applications.png';
  desktopImgPath: string = '/assets/images/destop.png';
  moreImgPath: string = '/assets/images/Vector.png';
  closeImgPath: string = '/assets/images/close.png';

  constructor(private user:UsersService) {

    this.clickEventSubscription =this.user.getClickEvent().subscribe(() => {
      this.loadApplicationData();
      this.loadProjectName();
    });
    this.loadApplicationData();
    this.loadProjectName();
  }

  openModal() {
    $('.create-app-modal').css({
      'display': 'grid'
    });
    this.loadProjectName();
  }

  closeModal() {
    $('.create-app-modal').css({
      'display': 'none'
    });
    this.selectedLevel = '';
  }

  appDots: boolean = true;
  appTaskMenuId: any = null;
  appTaskMenuFlag = true;

  openAppTaskMenu(id: any){
    this.appTaskMenuId = id;
    console.log(id);
    console.log(this.appTaskMenuId);
    if(this.appDots){
      this.appTaskMenuFlag = false;
      $('.app-dots, .app-task-menu').css({
        'transform':'scale(1)',
        'z-index': '2'
      });
      this.appDots = false;
    }
    else if(!this.appDots){
      this.appTaskMenuId = null;
      this.appTaskMenuFlag = true;
      $('.app-dots, .app-task-menu').css({
        'transform':'',
        'z-index': ''
      });
      this.appDots = true;
    }
  } 
 
  projectIdName: any = [];
  loadProjectName(){
    this.projectIdName = [];
    this.user.getProjectIdProjectName().subscribe(data => {
      this.projectIdName = data;
    });
  }

  appUiData:any = [];
  appData: any = {};
  loadApplicationData(){
    this.appUiData = [];
    console.log(this.appUiData);
    this.user.getApplicationsData().subscribe(data => {
      this.appData = data;
      for (let index = 0; index < this.appData.length; index++) {
        console.log(this.appData[index].deleted);
        if(this.appData[index].deleted == false){
          this.appUiData = [...this.appUiData, {
            appid:this.appData[index].appid,
            appName: this.appData[index].appName,
            appDescription:this.appData[index].appDescription,
            deleted:this.appData[index].deleted,
            projectID:this.appData[index].projectID,
            platformID:this.appData[index].platformID,
            createdBy:this.appData[index].createdBy,
            createdOn:this.appData[index].createdOn,
            updatedBy:this.appData[index].updatedBy,
            updatedOn:this.appData[index].updatedOn
          }];
        }
      }
      console.log(this.appUiData);
      console.log(this.appUiData[0].appid);
    });
  }

  selectedLevel: string = '';
  selected(event: any){
    this.selectedLevel = event.target.value;
    console.log(this.selectedLevel);
  }
  appData1: any = {};
  projectData1: any = {};
  createFlag: boolean = false;
  createNewApplication(form: any){
    if(this.selectedLevel == ''){
      alert("Please select a project name");
    }
    else{
      this.user.getProjectIdProjectName().subscribe(data => {
        this.projectData1 = data;
        for (let index = 0; index < this.projectData1.length; index++) {
          console.log(this.projectData1[index].projectname);
          if(this.projectData1[index].projectname == this.selectedLevel){

            let newFormData = {
              appName: form.value.appName,
              appDescription:form.value.appDescription,
              deleted:false,
              projectID:this.projectData1[index].projectid,
              platformID:5,
              createdBy:5,
              createdOn:Date.now(),
              updatedBy:1,
              updatedOn:Date.now()
            };
      
            console.log(newFormData);

            this.user.getApplicationsData().subscribe(data => {
              this.appData1 = data;
              for (let index = 0; index < this.appData1.length; index++) {
                if (this.appData1[index].appName === form.value.appName){
                  this.createFlag = true;
                  alert("The application name '" + form.value.appName + "' has already been reported");
                  break;
                }
              }
              if(this.createFlag == false){
                this.user.createApplication(newFormData).subscribe(data => {
                  console.log(data);
                });
                alert("'" + form.value.appName + "' Application Created Successfully");
                this.closeModal();
                this.user.sendClickEvent();
              }
              else{
                this.createFlag = false;
              }
      
            });

          }
          break;
        }
      });
      
    }

  }

  ngOnInit(): void {
  }

}
