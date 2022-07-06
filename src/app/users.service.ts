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
    let getProjectsSreverlessUrl = "https://zew9dv8n6g.execute-api.ap-south-1.amazonaws.com/QA/project/getAllProjects";
    return this.http.get(getProjectsSreverlessUrl);
  }

  createProject(createBody: any){
    let createProjectServerlessUrl = "https://zew9dv8n6g.execute-api.ap-south-1.amazonaws.com/QA/project/addProject";
    return this.http.post(createProjectServerlessUrl, createBody);
  }

  updateProject(projectId: any, updatedBody: any){
    let updateProjectServerlessUrl = "https://zew9dv8n6g.execute-api.ap-south-1.amazonaws.com/QA/project/updateProject/" + projectId;
    return this.http.put(updateProjectServerlessUrl, updatedBody);
  }
  
}
