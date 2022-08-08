import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsComponent } from './applications.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsComponent ],
      imports: [HttpClientTestingModule, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
