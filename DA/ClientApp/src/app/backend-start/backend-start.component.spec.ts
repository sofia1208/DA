import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendStartComponent } from './backend-start.component';

describe('BackendStartComponent', () => {
  let component: BackendStartComponent;
  let fixture: ComponentFixture<BackendStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
