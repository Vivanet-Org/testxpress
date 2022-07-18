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

  andriodImagePath: string = '/assets/images/android.png';

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
    this.user.getData().subscribe(data => {
      this.data = data;
      for (let index = 0; index < this.data.length; index++) {
        console.log(this.data[index].deleted);
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
      console.log(this.uiData);
      console.log(this.uiData[0].projectid);
    });
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
  }

  editModal(id: any) {
    this.editId = id;
    this.editFlag = true;
    this.oldData = false;

  }
  duplicateModal(id: any) {
    this.editId = id;
    this.duplicateFlag = true;

  }
  deleteModal(id: any) {
    this.editId = id;
    this.deleteFlag = true;
  }

  updateExistingProject(form: any, id: any){
   
    this.user.getData().subscribe(data => {
      this.data1 = data;
      this.totalProjects = Object.keys(data).length;


      for (let index = 0; index < this.totalProjects; index++) {
        if (this.data1[index].projectName === form.value.projectName){
          alert("The project name '" + this.data[index].projectName + "' has already been Reported");
          this.flag = true;
          break;
        }
      }

      if(this.flag == false){
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
          if (this.data[index].projectid === id){
            this.duplicateData = {
              projectName: form.value.projectName,
              projectDescription:this.data[index].projectDescription,
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
    this.user.getData().subscribe(data => {
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
  ngOnInit(): void {
  }
}
