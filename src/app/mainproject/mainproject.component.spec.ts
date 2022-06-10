import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainprojectComponent } from './mainproject.component';

describe('MainprojectComponent', () => {
  let component: MainprojectComponent;
  let fixture: ComponentFixture<MainprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
