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
  
  getData(){
    let teProjectsSpringbootUrl = "http://localhost:8080/getAllProjects";
    // let getProjectsSreverlessUrl = "https://vv9w36rgwi.execute-api.us-east-1.amazonaws.com/dev/getProjects";
    return this.http.get(teProjectsSpringbootUrl);
  }

  createProject(createBody: any){
    let createProjectsSpringbootUrl = "http://localhost:8080/createProject";
    // let createProjectServerlessUrl = "https://vv9w36rgwi.execute-api.us-east-1.amazonaws.com/dev/createProject";
    return this.http.post(createProjectsSpringbootUrl, createBody);
  }

  updateProject(projectId: any, updatedBody: any){
    let updateProjectsSpringbootUrl = "http://localhost:8080/updateproject/" + projectId;
    return this.http.put(updateProjectsSpringbootUrl, updatedBody);
  }
    
}
