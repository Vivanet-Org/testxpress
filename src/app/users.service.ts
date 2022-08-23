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

  serverlesUrl : string = "http://localhost:8090";
  //serverlesUrl : string = "https://zew9dv8n6g.execute-api.ap-south-1.amazonaws.com/QA";

  // Project functions start
  getProjectsData(){
    let getUrl = this.serverlesUrl + "/project/getAllProjects";
    return this.http.get(getUrl);
  }

  createProject(createBody: any){
    let createUrl = this.serverlesUrl + "/project/createProject";
    return this.http.post(createUrl, createBody);
  }

  updateProject(projectId: any, updatedBody: any){
    let updateUrl = this.serverlesUrl + "/project/updateProject/" + projectId;
    return this.http.put(updateUrl, updatedBody);
  }

  getProjectIdProjectName(){
    let getUrl = this.serverlesUrl + "/project/getProjectIdProjectName";
    return this.http.get(getUrl);
  }

  searchProjects(searchString: any, ){
    let getUrl = this.serverlesUrl + "/project/searchProjects/" + searchString;
    return this.http.get(getUrl);
  }

  // Project functions end

  // Application functions start
  getApplicationsData(){
    let getUrl = this.serverlesUrl + "/application/getAllApplications";
    return this.http.get(getUrl);
  }

  createApplication(createBody: any){
    let createUrl = this.serverlesUrl + "/application/createApplication";
    return this.http.post(createUrl, createBody);
  }

  updateApplication(appId: any, updatedBody: any){
    let updateUrl = this.serverlesUrl + "/application/updateApplication/" + appId;
    return this.http.put(updateUrl, updatedBody);
  }

  // Application functions end
   
}
