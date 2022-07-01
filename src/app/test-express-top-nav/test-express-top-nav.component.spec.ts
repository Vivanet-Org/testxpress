import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExpressTopNavComponent } from './test-express-top-nav.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestExpressTopNavComponent', () => {
  let component: TestExpressTopNavComponent;
  let fixture: ComponentFixture<TestExpressTopNavComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
