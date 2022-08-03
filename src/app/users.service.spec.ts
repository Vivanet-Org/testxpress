import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

//Testing of UsersService
describe('UsersService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let service: UsersService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    //Configures testing app module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    
    service = TestBed.inject(UsersService);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new UsersService(httpClientSpy);

    // Instantiates HttpClient, HttpTestingController and UserService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // service = TestBed.inject(UsersService);

  });
  
  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

   //Test case 1
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test case 2 get projects
  it('should return expected projects called once', (done: DoneFn) => {
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

  //Test case 3 get projects if return error
  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = {
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    };
  
    httpClientSpy.get.and.returnValue(throwError(errorResponse));
  
    service.getData().subscribe({
        
      next: projects => done.fail('expected an error, not projects'),
      error: error  => {
        expect(error.error).toContain('test 404 error');
        done();
      }
    });
  });

  //  Test case 4 post project
  it('should add a project and return it', (done: DoneFn) => {
    const newProject: any = { 
      projectID:1,
      projectName:"Kraft Heinz Project",
      projectDescription:"The Kraft Heinz Project Company",
      isDeleted:0,
      createdBy:5,
      createdOn:"2022-06-27T12:05:02.614+00:00",
      updatedBy:2,
      updatedOn:"2022-06-27T12:05:02.614+00:00"
    };

    httpClientSpy.post.and.returnValue(of(newProject));
    service.createProject(newProject).subscribe({
      next:data => {
        expect(data)
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

  // Test case 5 post project if return error
  it('should call createProject return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = {
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    };
    const newProject: any = { 
      projectID:1,
      projectName:"Kraft Heinz Project",
      projectDescription:"The Kraft Heinz Project Company",
      isDeleted:0,
      createdBy:5,
      createdOn:"2022-06-27T12:05:02.614+00:00",
      updatedBy:2,
      updatedOn:"2022-06-27T12:05:02.614+00:00"
    };
  
    httpClientSpy.post.and.returnValue(throwError(errorResponse));
  
    service.createProject(newProject).subscribe({
        
      next: projects => done.fail('expected an error, not projects'),
      error: error  => {
        expect(error.error).toContain('test 404 error');
        done();
      }
    });
  });

  // Test 6 update project
  it('should call updateProject and return the updated Project from the API', (done: DoneFn) => {
    const id: number = 1;
    const updatedProject: any = {
      projectID: '1',
      projectName: 'Kraft Heinz Project 1',
      projectDescription: 'The Kraft Heinz Project Company',
    };

    httpClientSpy.put.and.returnValue(of(updatedProject));
    service.updateProject(id, updatedProject).subscribe({
      next: project => {
        expect(project)
          .withContext('expected project')
          .toEqual(updatedProject);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.put.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  // Test case 7 update projects if return error
  it('should call updateProject return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = {
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    };
    const id: number = 1;
    const updatedProject: any = {
      projectID: '1',
      projectName: 'Kraft Heinz Project 1',
      projectDescription: 'The Kraft Heinz Project Company',
    };

    httpClientSpy.put.and.returnValue(throwError(errorResponse));

    service.updateProject(id, updatedProject).subscribe({
        
      next: projects => done.fail('expected an error, not projects'),
      error: error  => {
        expect(error.error).toContain('test 404 error');
        done();
      }
    });
  });
  
});
