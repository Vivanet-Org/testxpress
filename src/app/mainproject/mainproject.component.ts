import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from "jquery";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-mainproject',
  templateUrl: './mainproject.component.html',
  styleUrls: ['./mainproject.component.css']
})
export class MainprojectComponent implements OnInit {

  @ViewChild('projectName') projectName!: ElementRef;
  @ViewChild('projectDescription') projectDescription!: ElementRef;

  closeImagePath: string = '/assets/images/close.png';

  constructor(public usersService:UsersService) { }
 
  data: any = {};
  totalProjects: number = {} = 0;
  flag: boolean = false;

  closeModal() {
    $('.bg-modal').css({
      'display': 'none'
    });
    this.projectName.nativeElement.value = '';
    this.projectDescription.nativeElement.value = '';
  }

  createNewProject(form: any){
   
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