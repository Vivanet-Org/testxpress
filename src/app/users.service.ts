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
    let getProjectsSreverlessUrl = "https://fmo5pxshx5.execute-api.us-east-1.amazonaws.com/dev/project/getAllProjects";
    return this.http.get(getProjectsSreverlessUrl);
  }

  createProject(createBody: any){
    let createProjectServerlessUrl = "https://fmo5pxshx5.execute-api.us-east-1.amazonaws.com/dev/project/addProject";
    return this.http.post(createProjectServerlessUrl, createBody);
  }

  updateProject(projectId: any, updatedBody: any){
    let updateProjectServerlessUrl = "https://fmo5pxshx5.execute-api.us-east-1.amazonaws.com/dev/project/updateProject/" + projectId;
    return this.http.put(updateProjectServerlessUrl, updatedBody);
  }
  
}
