import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExpressNavComponent } from './test-express-nav.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('TestExpressNavComponent', () => {
  let component: TestExpressNavComponent;
  let fixture: ComponentFixture<TestExpressNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExpressNavComponent ],
      imports: [ RouterTestingModule ]
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
