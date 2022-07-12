import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainprojectComponent } from './mainproject.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';
import { By } from '@angular/platform-browser';

describe('MainprojectComponent', () => {
  let component: MainprojectComponent;
  let fixture: ComponentFixture<MainprojectComponent>;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainprojectComponent ],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new UsersService(httpClientSpy);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal and its update display none', () => {
    const e = fixture.debugElement.query(By.css(".bg-modal")).nativeElement;
    component.closeModal()
    expect(getComputedStyle(e).display).toEqual('none');
  });

  it('should create a project and return it', (done: DoneFn) => {
    let fixture = TestBed.createComponent(MainprojectComponent);
    let component = fixture.debugElement.componentInstance;
    // let data: any = {};
    // let newProjectData: any = [];
    const newProject: any = { 
      value: {
        projectName:"abc",
        projectDescription:"xyz",
      }
    };
    httpClientSpy.post.and.returnValue(of(newProject));
    component.createNewProject(newProject);
    const newProjectData = {
      projectID:1,
      projectName: newProject.value.projectName,
      projectDescription:newProject.value. projectDescription,
      isDeleted:'false',
      createdBy:5,
      createdOn:"2022-06-27T12:05:02.614+00:00",
      updatedBy:2,
      updatedOn:"2022-06-27T12:05:02.614+00:00"
    };
    // expect(component.uiData).toEqual(newProject);
    service.createProject(newProjectData).subscribe({
      next:projects => {
        expect(projects)
        .withContext('expected project')
        .toEqual(newProject);
        done();
      },
      error:done. fail
    });
    expect(httpClientSpy.post.calls.count())
    .withContext('one call')
    .toBe(1);

  });

});
