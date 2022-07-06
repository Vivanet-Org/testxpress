import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';
import { of } from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new UsersService(httpClientSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal update the value of the variable', () => {
    spyOn(component, 'closeModal').and.callThrough();
    component.closeModal();
    expect(component.editFlag).toEqual(false);
    expect(component.duplicateFlag).toEqual(false);
    expect(component.deleteFlag).toEqual(false);
  });

  it('should call editModal update the value of the variable', () => {
    spyOn(component, 'editModal').and.callThrough();
    const id: number = 1;
    component.editModal(id);
    expect(component.editId).toEqual(id);
    expect(component.editFlag).toEqual(true);
    expect(component.oldData).toEqual(false);
  });

  it('should call duplicateModal update the value of the variable', () => {
    spyOn(component, 'duplicateModal').and.callThrough();
    const id: number = 1;
    component.duplicateModal(id);
    expect(component.editId).toEqual(id);
    expect(component.duplicateFlag).toEqual(true);
  });

  it('should call deleteModal update the value of the variable', () => {
    spyOn(component, 'deleteModal').and.callThrough();
    const id: number = 1;
    component.deleteModal(id);
    expect(component.editId).toEqual(id);
    expect(component.deleteFlag).toEqual(true);
  });

  it('should call loadData and return it', (done: DoneFn) => {
    let fixture = TestBed.createComponent(CardComponent);
    let component = fixture.debugElement.componentInstance;
    let data: any = {};
    let expectedUiData: any = [];
    const projectsData: any[] =[
      {
        projectID:1,
        projectName:"Kraft Heinz Project",
        projectDescription:"The Kraft Heinz Project Company",
        isDeleted:0,
        createdBy:5,
        createdOn:"2022-06-27T12:05:02.614+00:00",
        updatedBy:2,
        updatedOn:"2022-06-27T12:05:02.614+00:00"
      },
      {
        projectID:2,
        projectName:"TestXpress Project",
        projectDescription:"Test Automation Framework",
        isDeleted:0,
        createdBy:5,
        createdOn:"2022-06-27T12:05:02.614+00:00",
        updatedBy:2,
        updatedOn:"2022-06-27T12:05:02.614+00:00"
      },
    ];
    httpClientSpy.get.and.returnValue(of(projectsData));
    service.getData().subscribe({
      next: projects => {
        data = projects;
        for (let index = 0; index < data.length; index++) {
          if(data[index].isDeleted == 'false'){
            expectedUiData = [...expectedUiData, {
              projectID:data[index].projectID,
              projectName: data[index].projectName,
              projectDescription:data[index].projectDescription,
              isDeleted:data[index].isDeleted,
              createdBy:data[index].createdBy,
              createdOn:data[index].createdOn,
              updatedBy:data[index].updatedBy,
              updatedOn:data[index].updatedOn
            }];
          }
        }
        component.loadData()
        expect(component.uiData)
        .withContext('expected projects')
        .toEqual(expectedUiData);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should Edit a project and updateExistingProject Method is called', () => {
    let fixture = TestBed.createComponent(CardComponent);
    let component = fixture.debugElement.componentInstance;
    const id: number = 1;
    const form: any = { 
      value: {
        projectName:"abc",
        projectDescription:"xyz",
      }
    };
    spyOn(component, 'updateExistingProject')
    component.updateExistingProject(form, id)
    expect(component.updateExistingProject).toHaveBeenCalledWith(form, id);

    spyOn(service, 'updateProject')
    service.updateProject(id, form)
    expect(service.updateProject).toHaveBeenCalledWith(id, form);

  });

  it('should Duplicate a project and return it', (done: DoneFn) => {
    let fixture = TestBed.createComponent(CardComponent);
    let component = fixture.debugElement.componentInstance;
    const id: number = 1;
    const newProject: any = { 
      value: {
        projectName:"abc",
        projectDescription:"xyz",
      }
    };
    httpClientSpy.post.and.returnValue(of(newProject));
    component.duplicateProject(newProject, id);
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

  it('should delete a project and deleteExistingProject Method is called', () => {
    let fixture = TestBed.createComponent(CardComponent);
    let component = fixture.debugElement.componentInstance;
    const id: number = 1;
    spyOn(component, 'deleteExistingProject')
    component.deleteExistingProject(id)
    expect(component.deleteExistingProject).toHaveBeenCalledWith(id);

    const deletedData: any = { 
      value: {
        isDeleted:true
      }
    };
    spyOn(service, 'updateProject')
    service.updateProject(id, deletedData)
    expect(service.updateProject).toHaveBeenCalledWith(id, deletedData);
  });

});
