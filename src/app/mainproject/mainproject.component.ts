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
  exclamationImagePath: string = '/assets/images/exclamation-circle.png';
  checkCircleImg: string = '/assets/images/check-circle.png';

  constructor(public usersService:UsersService) { }
 
  data: any = {};
  totalProjects: number = {} = 0;
  flag: boolean = false;
  projectNameValue: string = '';
  projectNameFlag: boolean = false;
  existingProjectNameFlag: boolean = false;

  projectNameValueDisplay: string = '';

  closeModal() {
    $('.bg-modal').css({
      'display': 'none'
    });
    $('.cancelModal').css({
      'display': 'none'
    });
    console.log(this.projectNameValue);

    this.projectNameFlag = false;
    this.existingProjectNameFlag = false;
    this.projectNameValue = '';
    $('.inputStyles').css({
      'border': ''
    });

    this.createNewProjectForm.reset(); 
  }

  closeMessage(){
    console.log(this.projectNameValue);
    $('.createProjectMsg').css({
      'display': 'none'
    });
    this.projectNameValue='';
    console.log(this.projectNameValue);
  }
  

  projNameData(){
    if(this.projectNameValue != "" || this.projectNameValue != null){
      this.projectNameFlag = false;
      this.existingProjectNameFlag = false;      
      $('.inputStyles').css({
        'border': ''
      });
    }
  }

  createNewProject(form: any){
    this.projectNameValueDisplay=form.value.projectName;
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
            this.existingProjectNameFlag = true; 
            $('.inputStyles').css({
              'border': '1px solid #F5222D'
            });
            break;
          }
        }
        if(this.flag == false){
          console.log(newFormData);
          this.usersService.createProject(newFormData).subscribe(data => {
            console.log(data);
            
            $('.createProjectMsg').css({
              'display': 'block'
            });            

            this.closeModal();
            setTimeout(() => {
              this.closeMessage();
            }, 5000);
            this.usersService.sendClickEvent();
          });
        }
        else{
          this.flag = false;
        }

      });

    } else{
      this.projectNameFlag = true; 
      $('.inputStyles').css({
        'border': '1px solid #F5222D'
      });
    }
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

  ngOnInit(): void {
  }

}