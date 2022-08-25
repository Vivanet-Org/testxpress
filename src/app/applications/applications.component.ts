import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit {
  
  @ViewChild('appName') appName!: ElementRef;
  @ViewChild('appDescription') appDescription!: ElementRef;
  @ViewChild('projectsDropdown') projectsDropdown!: ElementRef;


  clickEventSubscription: Subscription;

  appsImgPath: string = '/assets/images/apps.png';
  androidPath: string = '/assets/images/android.png';
  appImgPath: string = '/assets/images/applications.png';
  desktopImgPath: string = '/assets/images/destop.png';
  moreImgPath: string = '/assets/images/more.png';
  closeImgPath: string = '/assets/images/close.png';
  deleteRedImagePath: string = '/assets/images/delete-red.png';

  constructor(private user: UsersService) {
    this.clickEventSubscription = this.user.getClickEvent().subscribe(() => {
      this.loadApplicationData();
      this.loadProjectName();
    });
    this.loadApplicationData();
    this.loadProjectName();
  }

  openModal() {
    $('.create-app-modal').css({
      display: 'grid',
    });
    this.loadProjectName();
  }

  closeModal() {
    $('.create-app-modal').css({
      display: 'none',
    });
    this.selectedLevel = '';
    this.appName.nativeElement.value = '';
    this.appDescription.nativeElement.value = '';
  }

  appDots: boolean = true;
  appTaskMenuId: any = null;
  appTaskMenuFlag = true;
  openAppTaskMenu(id: any) {
    this.appTaskMenuId = id;
    console.log(id);
    console.log(this.appTaskMenuId);
    if (this.appDots) {
      this.appTaskMenuFlag = false;
      $('.app-dots, .app-task-menu').css({
        transform: 'scale(1)',
        'z-index': '2',
      });
      this.appDots = false;
    } else if (!this.appDots) {
      this.appTaskMenuId = null;
      this.appTaskMenuFlag = true;
      $('.app-dots, .app-task-menu').css({
        transform: '',
        'z-index': '',
      });
      this.appDots = true;
    }
  }

  editId: any = null;
  editFlag: any = false;
  editModal(id: any) {
    this.editId = id;
    this.editFlag = true;
    this.openAppTaskMenu((this.appTaskMenuId = null));
    this.appTaskMenuFlag = true;
  }

  duplicateId: any = null;
  duplicateFlag: any = false;
  duplicateModal(id: any) {
    this.duplicateId = id;
    this.duplicateFlag = true;
    this.openAppTaskMenu((this.appTaskMenuId = null));
    this.appTaskMenuFlag = true;
  }

  deleteId: any = null;
  deleteFlag: any = false;
  deleteModal(id: any) {
    this.deleteId = id;
    this.deleteFlag = true;
    this.openAppTaskMenu((this.appTaskMenuId = null));
    this.appTaskMenuFlag = true;
  }

  closeEditDuplicateDeletePopup() {
    this.editId = null;
    this.editFlag = false;
    this.selectedLevel = '';
    this.duplicateId = null;
    this.duplicateFlag = false;
    this.deleteId = null;
    this.deleteFlag = false;
    this.projectsDropdown.nativeElement.value = "All Applications";
  }

  projectIdName: any = [];
  loadProjectName() {
    this.projectIdName = [];
    this.user.getProjectIdProjectName().subscribe((data) => {
      this.projectIdName = data;
    });
  }

  searchFlag: boolean = true;
  selectedValueDisplay: string = '';
  selectedProjectValue: string = '';
  isSelectedproject: boolean = false;
  selectedProject(event: any) {
    this.isSelectedproject = true;
    this.searchFlag = true;
    this.selectedProjectValue = event.target.value;
    this.selectedValueDisplay = this.selectedProjectValue;
    console.log(this.selectedProjectValue);
    if(this.selectedProjectValue == "All Applications"){
      this.loadApplicationData();
    } else {
      this.getprojectId();
    }
  }

  appUiData: any = [];
  appData: any = {};
  loadApplicationData() {
    this.searchFlag = true;
    this.appUiData = [];
    console.log(this.appUiData);

    if(this.projectID == null || this.selectedProjectValue == "All Applications"){
      this.appUiData = [];
      this.user.getApplicationsData().subscribe((data) => {
        this.appData = data;
        this.filterAppData();
        console.log(this.appUiData);
      });
    } else{
      this.appUiData = [];
      this.user.searchApplication(this.projectID).subscribe((data) => {
        this.appData = data;
        this.filterAppData();
        if(this.appUiData.length == 0 ){
          // this.filterAppData();
        //   this.selectedProjectValue = "All Applications";
        // } else{
          this.searchFlag = false;
          this.selectedProjectValue = "All Applications";
          this.projectID = null;
        }
        this.projectID = null;
        console.log(this.appUiData);
      });
      
    }
  }

  filterAppData(){
    for (let index = 0; index < this.appData.length; index++) {
      if (this.appData[index].deleted == false) {
        this.appUiData = [...this.appUiData, {
            appid: this.appData[index].appid,
            appName: this.appData[index].appName,
            appDescription: this.appData[index].appDescription,
            deleted: this.appData[index].deleted,
            projectID: this.appData[index].projectID,
            platformID: this.appData[index].platformID,
            createdBy: this.appData[index].createdBy,
            createdOn: this.appData[index].createdOn,
            updatedBy: this.appData[index].updatedBy,
            updatedOn: this.appData[index].updatedOn,
          },
        ];
      }
    }
  }

  selectedLevel: string = '';
  projectID = null;
  selected(event: any) {
    this.selectedLevel = event.target.value;
    console.log(this.selectedLevel);
  }
  getprojectId() {
    if (this.selectedLevel != '' || this.selectedProjectValue != '') {
      this.user.getProjectIdProjectName().subscribe((data) => {
        this.projectData1 = data;
        for (let index = 0; index < this.projectData1.length; index++) {
          // console.log(this.projectData1[index].projectname);
          if (this.projectData1[index].projectname == this.selectedLevel || this.projectData1[index].projectname == this.selectedProjectValue) {
            this.projectID = this.projectData1[index].projectid;
            console.log(this.projectID);
            if(this.isSelectedproject){
              this.loadApplicationData();
              this.isSelectedproject = false;              
            }
            break;
          }
        }
      });
    }
  }

  appData1: any = {};
  projectData1: any = {};
  createFlag: boolean = false;
  createNewApplication(form: any) {
    this.getprojectId();
    if(this.selectedLevel == ''){
      alert("Please select a project name");
    }
    else{
      this.user.getApplicationsData().subscribe((data) => {
        this.appData1 = data;
        for (let index = 0; index < this.appData1.length; index++) {
          if (this.appData1[index].appName === form.value.appName) {
            this.createFlag = true;
            alert("The application name '" + form.value.appName +"' has already been reported");
            break;
          }
        }
        if (this.createFlag == false) {
          console.log(this.projectID);
          let newFormData = {
            appName: form.value.appName,
            appDescription: form.value.appDescription,
            deleted: false,
            projectID: this.projectID,
            platformID: 5,
            createdBy: 5,
            createdOn: Date.now(),
            updatedBy: 1,
            updatedOn: Date.now()
          };
          console.log(newFormData);

          this.user.createApplication(newFormData).subscribe((data) => {
            console.log(data);
          });
          alert("'" + form.value.appName + "' Application Created Successfully");
          this.closeModal();
          this.user.sendClickEvent();
          this.projectID = null;
        } else {
          this.createFlag = false;
        }
      });
    }
  }

  updatedFormData = {};
  updateFlag: boolean = false;
  appNameCount: any = {} = 0;
  updateExistingApplication(form: any, id: any) {
    this.getprojectId();

    this.user.getApplicationsData().subscribe((data) => {
      this.appData1 = data;
      for (let index = 0; index < this.appData1.length; index++) {
        if (this.appData1[index].appName === form.value.appName) {
          this.appNameCount ++;
          if(this.appData1[index].appid === id){
            this.updateFlag = true;
          }
        }
      }
      if ((this.updateFlag == true && this.appNameCount == 1) || this.appNameCount == 0) {
        for (let index = 0; index < this.appData1.length; index++) {
          if (this.appData1[index].appid === id) {
            this.updatedFormData = {
              appName: form.value.appName,
              appDescription: form.value.appDescription,
              deleted: this.appData1[index].deleted,
              projectID: this.projectID ? this.projectID : this.appData1[index].projectID,
              updatedBy: this.appData1[index].updatedBy,
              updatedOn: Date.now()
            };
            break;
          }
        }
        console.log(id);
        console.log(this.updatedFormData);
        this.user.updateApplication(id, this.updatedFormData).subscribe((data) => {
          console.log(data);
          this.loadApplicationData();
          this.projectID = null;
        });
        this.closeEditDuplicateDeletePopup();
      } else {
        alert("The application name '" + form.value.appName + "' has already been reported");
      }
      this.updateFlag = false;
      this.appNameCount = 0;
    });
  }

  duplicateData = {};
  duplicateApplication(form: any, id: any){
    this.getprojectId();

    let flag = true;
    this.user.getApplicationsData().subscribe((data) => {
      this.appData1 = data;
      for (let index = 0; index < this.appData1.length; index++) {
        if (this.appData1[index].appName === form.value.appName) {
          alert("The application name '" + form.value.appName + "' has already been reported");
          flag = false;
          break;
        }
      }
      if(flag){
        for (let index = 0; index < this.appData1.length; index++) {
          if (this.appData1[index].appid === id){
            this.duplicateData = {
              appName: form.value.appName,
              appDescription: form.value.appDescription,
              deleted: false,
              projectID: this.projectID ? this.projectID : this.appData1[index].projectID,
              platformID: this.appData1[index].platformID,
              createdBy: this.appData1[index].createdBy,
              createdOn: Date.now(),
              updatedBy: this.appData1[index].updatedBy,
              updatedOn: Date.now()
            };
            break;
          }
        }
        this.user.createApplication(this.duplicateData).subscribe(data => {
          console.log(data);
          this.loadApplicationData();
          this.projectID = null;
        });
        this.closeEditDuplicateDeletePopup();
      }
      
    });
  }

  deleteApplication(id: any){
    this.appUiData = [];
    this.user.getApplicationsData().subscribe(data => {
      this.appData1 = data;
      for (let index = 0; index < this.appData1.length; index++) {
        if (this.appData1[index].appid === id){
          this.updatedFormData = {
            appName: this.appData1[index].appName,
            appDescription: this.appData1[index].appDescription,
            deleted: true,
            projectID: this.appData1[index].projectID,
            updatedBy: this.appData1[index].updatedBy,
            updatedOn: Date.now()
          };
          break;
        }
      }
      console.log(id);
      console.log(this.updatedFormData);
      this.user.updateApplication(id, this.updatedFormData).subscribe(data => {
        console.log(data);
        this.loadApplicationData();
        this.closeEditDuplicateDeletePopup();
      });
    });
  };

  ngOnInit(): void { }
}