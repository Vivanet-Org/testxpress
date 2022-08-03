import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private subject = new  Subject<any>();
  sendClickEvent(){
    this.subject.next("");
  }
  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }

  constructor(private http: HttpClient) { }

  projectsUrl : string = "http://localhost:8080/project";
  applicationsUrl : string = "http://localhost:8080/application";
  // serverlesUrl : string = "https://zew9dv8n6g.execute-api.ap-south-1.amazonaws.com/QA/project";

  // Project functions start
  getProjectsData(){
    let getUrl = this.projectsUrl + "/getAllProjects";
    return this.http.get(getUrl);
  }

  createProject(createBody: any){
    let createUrl = this.projectsUrl + "/createProject";
    return this.http.post(createUrl, createBody);
  }

  updateProject(projectId: any, updatedBody: any){
    let updateUrl = this.projectsUrl + "/updateProject/" + projectId;
    return this.http.put(updateUrl, updatedBody);
  }
  // Project functions end

  // Application functions start
  getApplicationsData(){
    let getUrl = this.applicationsUrl + "/getAllApplications";
    return this.http.get(getUrl);
  }

  createApplication(createBody: any){
    let createUrl = this.applicationsUrl + "/createApplication";
    return this.http.post(createUrl, createBody);
  }

  updateApplication(appId: any, updatedBody: any){
    let updateUrl = this.applicationsUrl + "/updateApplication/" + appId;
    return this.http.put(updateUrl, updatedBody);
  }
  // Application functions end
   
}
