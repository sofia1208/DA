import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccessfulAddedComponent } from './dialog-successful-added.component';

describe('DialogSuccessfulAddedComponent', () => {
  let component: DialogSuccessfulAddedComponent;
  let fixture: ComponentFixture<DialogSuccessfulAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSuccessfulAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccessfulAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
