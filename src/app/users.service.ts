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

  serverlesUrl : string = "https://zew9dv8n6g.execute-api.ap-south-1.amazonaws.com/QA/project/";

  getData(){
    let getUrl = this.serverlesUrl + "getAllProjects";
    return this.http.get(getUrl);
  }

  createProject(createBody: any){
    let createUrl = this.serverlesUrl + "addProject";
    return this.http.post(createUrl, createBody);
  }

  updateProject(projectId: any, updatedBody: any){
    let updateUrl = this.serverlesUrl + "updateProject/" + projectId;
    return this.http.put(updateUrl, updatedBody);
  }
 
}
