import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import * as $ from "jquery";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @ViewChild('searchField') searchField!: ElementRef;

  clickEventSubscription:Subscription;

  andriodImagePath: string = '/assets/images/android.png';
  deleteImagePath: string = '/assets/images/delete.png';
  closeImagePath: string = '/assets/images/close.png';
  // buttonCloseImagePath: string = '/assets/images/close.png';
  deleteRedImagePath: string = '/assets/images/delete-red.png';
  moreImgPath: string = '/assets/images/more.png';
  webImgPath: string = '/assets/images/web.png';  
  appleImgPath: string = '/assets/images/apple.png';
  desktopGreyImgPath: string = '/assets/images/desktop-grey.png';
  avatarImg1Path: string = '/assets/images/avatar-photo4px-1.png';
  avatarImg2Path: string = '/assets/images/avatar-photo4px-2.png';
  textImgPath: string = '/assets/images/text-4px.png';
  srarchImagePath: string = '/assets/images/search.png';

  manageMembersData:any = [
    {
      memberId: 1,
      memberImg: '/assets/images/photo1.png',
      memberName: "John Doe",
      memberEmail: "johndoe@gmail.com",
      memberRole: "Admin",
      memberIsDeleted: false
    },
    {
      memberId: 2,
      memberImg: '/assets/images/photo2.png',
      memberName: "Jacob Jones",
      memberEmail: "jacob.j@gmail.com",
      memberRole: "Leader",
      memberIsDeleted: false
    },
    {
      memberId: 3,
      memberImg: '/assets/images/photo3.png',
      memberName: "Theresa Webb",
      memberEmail: "theresa.webb@gmail.com",
      memberRole: "Tester",
      memberIsDeleted: false
    },
    {
      memberId: 4,
      memberImg: '/assets/images/photo4.png',
      memberName: "Courtney Henry",
      memberEmail: "courtney@gmail.com",
      memberRole: "QA",
      memberIsDeleted: false
    }
  ];
  manageMembersLastId:number = this.manageMembersData.slice(-1)[0].memberId;

  editId:any = null;
  oldData:any = true;
  editFlag:any = false;
  duplicateFlag:any = false;
  deleteFlag:any = false;

  updatedFormData = {};
  duplicateData = {};
  
  data: any = {};
  uiData:any = [];

  constructor(private user:UsersService) {

    this.clickEventSubscription =this.user.getClickEvent().subscribe(() => {
      this.loadProjectData();
    });

    this.loadProjectData();
  }

  searchdValue: string = '';
  searchdValueDisplay: string = '';
  searchFlag: boolean = true;
  searchString(event: any){
    this.searchFlag = true;
    this.searchdValue = event.target.value;
    this.searchdValueDisplay = this.searchdValue;
    console.log(this.searchdValue);
  }

  searchData(){
    if(this.searchdValue != ''){
      this.loadProjectData();
    } else{
      alert("You must enter at least one character.");  
      this.loadProjectData();    
    }
  }

  loadProjectData(){
    
    this.searchFlag = true;
    console.log(this.searchdValue);

    if(this.searchdValue == ''){
      this.uiData = [];
      console.log(this.uiData);
      this.user.getProjectsData().subscribe(data => {
        this.data = data;
        this.filterData();
        console.log(this.uiData);
      });
    } else{
      this.uiData = [];
      this.user.searchProjects(this.searchdValue).subscribe(data => {
        this.data = data;
        if(this.data.length != 0 ){
        this.filterData();
        this.searchField.nativeElement.value = '';
        this.searchdValue = '';
        } else{
          this.searchFlag = false;
          this.searchField.nativeElement.value = '';
          this.searchdValue = '';
        }
        console.log(this.uiData);
      });
    }
  }
  
  filterData(){
    for (let index = 0; index < this.data.length; index++) {
      if(this.data[index].deleted == false){
        this.uiData = [...this.uiData, {
          projectid:this.data[index].projectid,
          projectName: this.data[index].projectName,
          projectDescription:this.data[index].projectDescription,
          deleted:this.data[index].deleted,
          createdBy:this.data[index].createdBy,
          createdOn:this.data[index].createdOn,
          updatedBy:this.data[index].updatedBy,
          updatedOn:this.data[index].updatedOn
        }];
      }
    }
  }

  deleteManageMembersData(id: any){
    for (let index = 0; index < this.manageMembersData.length; index++) {
      if(this.manageMembersData[index].memberId === id){
        this.manageMembersData[index] = {
          memberId: this.manageMembersData[index].memberId,
          memberImg: this.manageMembersData[index].memberImg,
          memberName: this.manageMembersData[index].memberName,
          memberEmail: this.manageMembersData[index].memberEmail,
          memberRole: this.manageMembersData[index].memberRole,
          memberIsDeleted:true
        };
      }
    }
  }

  dots: boolean = true;
  taskMenuId: any = null;
  taskMenuFlag = true;

  openTaskMenu(id: any){
    this.taskMenuId = id;
    console.log(id);
    console.log(this.taskMenuId);
    if(this.dots){
      this.taskMenuFlag = false;
      $('.dots, .task-menu').css({
        'transform':'scale(1)',
        'z-index': '2'
      });
      this.dots = false;
    }
    else if(!this.dots){
      this.taskMenuId = null;
      this.taskMenuFlag = true;
      $('.dots, .task-menu').css({
        'transform':'',
        'z-index': ''
      });
      this.dots = true;
    }
  } 
  
  data1: any = {};
  data2: any = {};
  totalProjects: any = {} = 0;
  flag: any = false;

  closeModal() {
    this.editId = null;
    this.editFlag = false;
    this.duplicateFlag = false;
    this.deleteFlag = false;
    this.membersId = null;
    this.membersFlag = false;

    for (let index = 0; index < this.manageMembersData.length; index++) {
      this.manageMembersData[index] = {
        memberId: this.manageMembersData[index].memberId,
        memberImg: this.manageMembersData[index].memberImg,
        memberName: this.manageMembersData[index].memberName,
        memberEmail: this.manageMembersData[index].memberEmail,
        memberRole: this.manageMembersData[index].memberRole,
        memberIsDeleted:false
      };
    }

  }

  editModal(id: any) {
    this.editId = id;
    this.editFlag = true;
    this.oldData = false;
    this.openTaskMenu(this.taskMenuId = null);
    this.taskMenuFlag = true;
  }
  duplicateModal(id: any) {
    this.editId = id;
    this.duplicateFlag = true;
    this.openTaskMenu(this.taskMenuId = null);
    this.taskMenuFlag = true;

  }
  deleteModal(id: any) {
    this.editId = id;
    this.deleteFlag = true;
    this.openTaskMenu(this.taskMenuId = null);
    this.taskMenuFlag = true;

  }

  membersId: any = null;
  membersFlag:any = false;
  membersModal(id: any) {
    this.membersId = id;
    this.membersFlag = true;
  }

  openModal() {
    $('.bg-modal').css({
      'display': 'grid'
    });
  }

  projectNameCount: any = {} = 0;
  updateExistingProject(form: any, id: any){
   
    this.user.getProjectsData().subscribe(data => {
      this.data1 = data;
      this.totalProjects = Object.keys(data).length;

      for (let index = 0; index < this.totalProjects; index++) {
        if (this.data1[index].projectName === form.value.projectName){
          this.projectNameCount ++;
          if(this.data1[index].projectid === id){
            this.flag = true;
          }
          // alert("The project name '" + this.data[index].projectName + "' has already been Reported");
          // this.flag = true;
          // break;
        }
      }

      if((this.flag == true && this.projectNameCount == 1) || this.projectNameCount == 0){
        for (let index = 0; index < this.totalProjects; index++) {
          if (this.data1[index].projectid === id){
            this.updatedFormData = {
              projectName: form.value.projectName,
              projectDescription:form.value.projectDescription,
              deleted:this.data1[index].deleted,
              createdBy:this.data1[index].createdBy,
              createdOn:this.data1[index].createdOn,
              updatedBy:this.data1[index].updatedBy,
              updatedOn:Date.now()
            };
            break;
          }
        }
        console.log(id);
        console.log(this.updatedFormData);
        this.user.updateProject(id, this.updatedFormData).subscribe(data => {
          console.log(data);
          this.loadProjectData();
        });
        this.closeModal();
      }
      else{
        alert("The project name '" + form.value.projectName + "' has already been Reported");
      }
      this.flag = false;
      this.projectNameCount = 0;
    });
  }

  duplicateProject(form: any, id: any){
    let flag = true;
    this.user.getProjectsData().subscribe(data => {
      this.data = data;
      this.totalProjects = Object.keys(data).length;
      console.log(form.value.projectName);
      for (let index = 0; index < this.totalProjects; index++) {
        if(this.data[index].projectName == form.value.projectName){
          alert("The project name '" + this.data[index].projectName + "' has already been Reported");
          flag = false;
          break;
        }        
      }
      if(flag){
        for (let index = 0; index < this.totalProjects; index++) {
          if (this.data[index].projectid === id){
            this.duplicateData = {
              projectName: form.value.projectName,
              projectDescription:form.value.projectDescription,
              // projectDescription:this.data[index].projectDescription,
              deleted:this.data[index].deleted,
              createdBy:this.data[index].createdBy,
              createdOn:Date.now(),
              updatedBy:this.data[index].updatedBy,
              updatedOn:Date.now()
            };
            break;
          }
        }
        this.user.createProject(this.duplicateData).subscribe(data => {
          console.log(data);
          this.user.sendClickEvent();
        });
        console.log(this.duplicateData);
        this.closeModal();
      }
    });
  }
  
  deleteExistingProject(id:any){
    this.uiData = [];
    this.user.getProjectsData().subscribe(data => {
      this.data2 = data;
      this.totalProjects = Object.keys(data).length;
      for (let index = 0; index < this.totalProjects; index++) {
        if (this.data2[index].projectid === id){
          this.updatedFormData = {
            projectName: this.data2[index].projectName,
            projectDescription:this.data2[index].projectDescription,
            deleted:true,
            createdBy:this.data2[index].createdBy,
            createdOn:this.data2[index].createdOn,
            updatedBy:this.data2[index].updatedBy,
            updatedOn:Date.now()
          };
          break;
        }
      }
      console.log(id);
      console.log(this.updatedFormData);
      this.user.updateProject(id, this.updatedFormData).subscribe(data => {
        console.log(data);
        this.user.sendClickEvent();
        this.closeModal();
      });
    });
    console.log(id);
  }

  manageMembers(form: any, id: any){}
  ngOnInit(): void {
  }
}
