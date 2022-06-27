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

  constructor(private http:HttpClient) { }

  getData(){
    let teProjectsUrl = "http://localhost:8080/getAllProjects";
    return this.http.get(teProjectsUrl);
  }

  createProject(createBody: any){
    let createProjectsUrl = "http://localhost:8080/createProject";
    return this.http.post(createProjectsUrl, createBody);
  }

  updateProject(projectId: any, updatedBody: any){
    let updateProjectsUrl = "http://localhost:8080/updateproject/" + projectId;
    return this.http.put(updateProjectsUrl, updatedBody);
  }
  
  deleteProject(projectId: any){
    let deleteProjectUrl = 'http://localhost:8080/deleteProject/' + projectId;
    return this.http.delete(deleteProjectUrl);
  }
  
}
