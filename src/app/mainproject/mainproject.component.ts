import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-mainproject',
  templateUrl: './mainproject.component.html',
  styleUrls: ['./mainproject.component.css']
})
export class MainprojectComponent implements OnInit {

  constructor(public usersService:UsersService) { }

  today = new Date();
  date = this.today.setDate(this.today.getDate()); 
  todayDate = new Date(this.date).toISOString().slice(0,10);

  timeNow = new Date().toLocaleString().slice(10);

  dateTime = this.todayDate + " " + this.timeNow;
	 
  data: any = {};
  totalProjects: any = {} = 0;
  flag: any = false;

  closeModal() {
    $('.bg-modal').css({
      'display': 'none'
    });
  }

  createNewProject(form: any){
   
    const newFormData = {
      projectName: form.value.projectName,
      projectDescription:form.value.projectDescription,
      isDeleted:0,
      createdBy:5,
      createdOn:this.dateTime,
      updatedBy:1,
      updatedOn:this.dateTime
    };

    this.usersService.getData().subscribe(data => {
      this.data = data;
      this.totalProjects = Object.keys(data).length;

      for (let index = 0; index < this.totalProjects; index++) {
        if (this.data[index].projectName === form.value.projectName){
          this.flag = true;
          alert("The project name '" + form.value.projectName + "' has already been reported");
          break;
        }
      }
      if(this.flag == false){
        this.usersService.createProject(newFormData).subscribe(data => {
          console.log(data);
        });
        alert("'" + form.value.projectName + "' Project Created Successfully");
        this.closeModal();
        this.usersService.sendClickEvent();
      }
      else{
        this.flag = false;
      }

    });

  }

  ngOnInit(): void {
  }

}
