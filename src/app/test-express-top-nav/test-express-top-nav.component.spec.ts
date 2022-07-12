import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TestExpressTopNavComponent } from './test-express-top-nav.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';
import { By } from '@angular/platform-browser';
// import { MainprojectComponent } from '../mainproject/mainproject.component';


describe('TestExpressTopNavComponent', () => {
  let component: TestExpressTopNavComponent;
  let fixture: ComponentFixture<TestExpressTopNavComponent>;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: UsersService;
  // let mainproject: MainprojectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExpressTopNavComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExpressTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new UsersService(httpClientSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call closeModal and its update display none', () => {
  //   // let fixture = TestBed.createComponent(MainprojectComponent);
  //   // let mainComponent = fixture.debugElement.componentInstance;
    
  //   const e = fixture.debugElement.query(By.css(".bg-modal")).nativeElement;
  //   component.openModal()
  //   expect(getComputedStyle(e).display).toEqual('grid');
  // });

  it('should call loadTotalProjectsNum and update totalProjects value', (done: DoneFn) => {
    let fixture = TestBed.createComponent(TestExpressTopNavComponent);
    let component = fixture.debugElement.componentInstance;
    let expectedProjectsNumber = 0;
    const expectedProjects: any[] =[
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
    httpClientSpy.get.and.returnValue(of(expectedProjects));
    service.getData().subscribe({
      next: projects => {
        expectedProjectsNumber = projects.valueOf.length,
        component.loadTotalProjectsNum()
        expect(component.totalProjects).toEqual(expectedProjectsNumber)
        expect(projects)
          .withContext('expected projects')
          .toEqual(expectedProjects);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

});
