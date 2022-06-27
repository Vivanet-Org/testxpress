import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import * as $ from "jquery";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  clickEventSubscription:Subscription;

  imagePath: any;

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
      this.loadData();
    });

    this.loadData();
  }

  loadData(){
    this.uiData = [];
    console.log(this.uiData);
    this.imagePath = '/assets/images/android.png';

    this.user.getData().subscribe(data => {
      this.data = data;

      for (let index = 0; index < this.data.length; index++) {
        if(this.data[index].isDeleted == 0){
          this.uiData = [...this.uiData, {
            projectID:this.data[index].projectID,
            projectName: this.data[index].projectName,
            projectDescription:this.data[index].projectDescription,
            isDeleted:this.data[index].isDeleted,
            createdBy:this.data[index].createdBy,
            createdOn:this.data[index].createdOn,
            updatedBy:this.data[index].updatedBy,
            updatedOn:this.data[index].updatedOn
          }];
        }
      }
      console.log(this.uiData);
      console.log(this.uiData[0].projectID);
    });
  }
  
  today = new Date();
  date = this.today.setDate(this.today.getDate()); 
  todayDate = new Date(this.date).toISOString().slice(0,10);

  timeNow = new Date().toLocaleString().slice(10);

  dateTime = this.todayDate + " " + this.timeNow;
	 
  data1: any = {};
  data2: any = {};
  totalProjects: any = {} = 0;
  flag: any = false;

  closeModal() {
    $('.updateContainer').css({
      'display': 'none'
    });
    this.editId = null;
    this.editFlag = false;
    this.duplicateFlag = false;
    this.deleteFlag = false;
  }

  editModal(id: any) {
    console.log("editModel");
    $('.updateContainer').css({
      'display': 'grid'
    });
    this.editId = id;
    this.editFlag = true;
    this.oldData = false;

  }
  duplicateModal(id: any) {
    console.log("duplicateModel");
    $('.updateContainer').css({
      'display': 'grid'
    });
    this.editId = id;
    this.duplicateFlag = true;

  }
  deleteModal(id: any) {
    console.log("deleteModel");
    $('.updateContainer').css({
      'display': 'grid'
    });
    this.editId = id;
    this.deleteFlag = true;

  }

  updateExistingProject(form: any, id: any){
   
    this.user.getData().subscribe(data => {
      this.data1 = data;
      this.totalProjects = Object.keys(data).length;


      for (let index = 0; index < this.totalProjects; index++) {
        if (this.data1[index].projectName === form.value.projectName){
          this.flag = true;
          break;
        }
      }

      if(this.flag == false){
        for (let index = 0; index < this.totalProjects; index++) {
          if (this.data1[index].projectID === id){
            this.updatedFormData = {
              projectName: form.value.projectName,
              projectDescription:form.value.projectDescription,
              isDeleted:this.data1[index].isDeleted,
              createdBy:this.data1[index].createdBy,
              createdOn:this.data1[index].createdOn,
              updatedBy:this.data1[index].updatedBy,
              updatedOn:this.dateTime
            };
            break;
          }
        }
        console.log(id);
        console.log(this.updatedFormData);
        this.user.updateProject(id, this.updatedFormData).subscribe(data => {
          console.log(data);
          this.loadData();
        });
        this.closeModal();


      }
      else{
        this.flag = false;
      }

    });
  }

  duplicateProject(form: any, id: any){

    let flag = true;
   
    this.user.getData().subscribe(data => {
      this.data = data;
      this.totalProjects = Object.keys(data).length;
      console.log(form.value.projectName);

      for (let index = 0; index < this.totalProjects; index++) {
        if(this.data[index].projectName == form.value.projectName){
          alert("The project name '" + this.data[index].projectName + "' has already been Duplicated");
          flag = false;
          break;
        }        
      }
      if(flag){
        for (let index = 0; index < this.totalProjects; index++) {
          if (this.data[index].projectID === id){
            this.duplicateData = {
              projectName: form.value.projectName,
              projectDescription:this.data[index].projectDescription,
              isDeleted:this.data[index].isDeleted,
              createdBy:this.data[index].createdBy,
              createdOn:this.dateTime,
              updatedBy:this.data[index].updatedBy,
              updatedOn:this.dateTime
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

    this.user.getData().subscribe(data => {
      this.data2 = data;
      this.totalProjects = Object.keys(data).length;
    
      for (let index = 0; index < this.totalProjects; index++) {
        if (this.data2[index].projectID === id){
          this.updatedFormData = {
            projectName: this.data2[index].projectName,
            projectDescription:this.data2[index].projectDescription,
            isDeleted:1,
            createdBy:this.data2[index].createdBy,
            createdOn:this.data2[index].createdOn,
            updatedBy:this.data2[index].updatedBy,
            updatedOn:this.dateTime
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

  ngOnInit(): void {
  }

}
