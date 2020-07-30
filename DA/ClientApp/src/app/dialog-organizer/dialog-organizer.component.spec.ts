import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrganizerComponent } from './dialog-organizer.component';

describe('DialogOrganizerComponent', () => {
  let component: DialogOrganizerComponent;
  let fixture: ComponentFixture<DialogOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
