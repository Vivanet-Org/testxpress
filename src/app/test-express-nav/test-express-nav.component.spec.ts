import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExpressNavComponent } from './test-express-nav.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestExpressNavComponent', () => {
  let component: TestExpressNavComponent;
  let fixture: ComponentFixture<TestExpressNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExpressNavComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExpressNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
