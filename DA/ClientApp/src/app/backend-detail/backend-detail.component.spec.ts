import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendDetailComponent } from './backend-detail.component';

describe('BackendDetailComponent', () => {
  let component: BackendDetailComponent;
  let fixture: ComponentFixture<BackendDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
