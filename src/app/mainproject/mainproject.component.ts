import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from "jquery";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-mainproject',
  templateUrl: './mainproject.component.html',
  styleUrls: ['./mainproject.component.css']
})
export class MainprojectComponent implements OnInit {

  @ViewChild('createNewProjectForm') createNewProjectForm : any;

  closeImagePath: string = '/assets/images/close.png';

  constructor(public usersService:UsersService) { }
 
  data: any = {};
  totalProjects: number = {} = 0;
  flag: boolean = false;

  closeModal() {
    $('.bg-modal').css({
      'display': 'none'
    });

    this.createNewProjectForm.reset(); 
  }

  createNewProject(form: any){
    console.log(form.value.projectName);
    if(form.value.projectName != null && form.value.projectName != ''){
      const newFormData = {
        projectName: form.value.projectName,
        projectDescription:form.value.projectDescription,
        deleted:false,
        createdBy:5,
        createdOn:Date.now(),
        updatedBy:1,
        updatedOn:Date.now()
      };

      this.usersService.getProjectsData().subscribe(data => {
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
          console.log(newFormData);
          this.usersService.createProject(newFormData).subscribe(data => {
            console.log(data);
            alert("'" + form.value.projectName + "' Project Created Successfully");
            this.closeModal();
            this.usersService.sendClickEvent();
          });
        }
        else{
          this.flag = false;
        }

      });

    } else{
      alert("Please Enter Project Name");
    }
  }

  ngOnInit(): void {
  }

}