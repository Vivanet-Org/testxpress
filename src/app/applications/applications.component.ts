import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css', '../../styles.css'],
})
export class ApplicationsComponent implements OnInit {
  
  @ViewChild('projectsDropdown') projectsDropdown!: ElementRef;
  @ViewChild('createNewApplicationForm') createNewApplicationForm : any;

  appsImgPath: string = '/assets/images/apps.png';
  appImgPath: string = '/assets/images/applications.png';
  desktopImgPath: string = '/assets/images/destop.png';
  moreImgPath: string = '/assets/images/more.png';
  closeImgPath: string = '/assets/images/close.png';
  deleteRedImagePath: string = '/assets/images/delete-red.png';
  exclamationImagePath: string = '/assets/images/exclamation-circle.png';

  constructor(private user: UsersService) {
    this.loadApplicationData();
    this.loadProjectName();
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {

    let temporaryThis = this; 

    $('html').click(function(e){
      if (e.target.id == 'appOverlay' || $(e.target).parents('#appOverlay').length > 0) {
        if(temporaryThis.editId != null){
          temporaryThis.appTaskMenuFlag = false;
        }
      } else {
        temporaryThis.appTaskMenuId = null;
        temporaryThis.appTaskMenuFlag = true;
        $('.app-dots, .app-task-menu').css({
          transform: '',
          'z-index': '',
        });
        temporaryThis.appDots = true;

      }
    });

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
    $('.cancelModal').css({
      'display': 'none'
    });
    this.selectedLevel = '';
    this.createNewApplicationForm.reset();
  }

  openCancelModal() {
    $('.cancelModal').css({
      'display': 'grid'
    });
  }
  closeContinueModal(){
    $('.cancelModal').css({
      'display': 'none'
    });
  }

  appDots: boolean = true;
  appTaskMenuId: any = null;
  appTaskMenuFlag = true;
  openAppTaskMenu(id: any) {
    if(id != '' && id != null){

      this.defaultSelect(id);

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
  }

  editId: any = null;
  editFlag: any = false;
  editModal(id: any) {
    this.editId = id;
    this.editFlag = true;
    this.openAppTaskMenu((this.appTaskMenuId = null));
    this.appTaskMenuFlag = true;
  }

  defaultValue: any = [];
  defaultProjectId: any = null;
  defaultProjectName: any = '';
  defaultSelect(id: any){
    for (let index = 0; index < this.appUiData.length; index++) {
      if (this.appUiData[index].appid == id) {
        this.defaultProjectId = this.appUiData[index].projectID;
        console.log(this.defaultProjectId);
        break;
      }
    }
    console.log(this.defaultProjectId);

    for (let index = 0; index < this.projectIdName.length; index++) {
      if (this.projectIdName[index].projectid == this.defaultProjectId) {
        this.defaultProjectName = this.projectIdName[index].projectname;
        console.log(this.defaultProjectName);
        this.defaultValue = this.defaultProjectName;
        break;
      }
    }
    console.log(this.defaultProjectName);
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
    this.projectsDropdown.nativeElement.value = "All Projects";
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
    if(this.selectedProjectValue == "All Projects"){
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

    if(this.projectID == null || this.selectedProjectValue == "All Projects"){
      console.log("Search edit");
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
          this.searchFlag = false;
          this.selectedProjectValue = "All Projects";
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
    this.selectedLevel = event.target.value.slice(3);
    console.log(this.selectedLevel);
  }
  selectedCreate(event: any) {
    this.selectedLevel = event.target.value;
  }
  getprojectId() {
    console.log(this.selectedLevel);
    console.log(this.selectedProjectValue);
    if (this.selectedLevel != '' || this.selectedProjectValue != '') {
      this.user.getProjectIdProjectName().subscribe((data) => {
        this.projectData1 = data;
        for (let index = 0; index < this.projectData1.length; index++) {
          if (this.projectData1[index].projectname == this.selectedLevel || this.projectData1[index].projectname == this.selectedProjectValue) {
            this.projectID = this.projectData1[index].projectid;
            console.log(this.projectID);
            this.selectedProjectValue = '';
            this.selectedLevel = '';
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

    if(form.value.appName != null && form.value.appName != ''){
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
              alert("'" + form.value.appName + "' Application Created Successfully");
              this.closeModal();
              this.projectID = null;
              this.loadApplicationData();
            });
          } else {
            this.createFlag = false;
          }
        });
      }
    } else{
      alert("Please Enter Application Name");
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
          this.updatedFormData = [];
          this.selectedProjectValue = "All Projects";
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
          this.duplicateData = [];
          this.selectedProjectValue = "All Projects";
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