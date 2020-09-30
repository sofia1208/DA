import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMoreEventsComponent } from './dialog-more-events.component';

describe('DialogMoreEventsComponent', () => {
  let component: DialogMoreEventsComponent;
  let fixture: ComponentFixture<DialogMoreEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMoreEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMoreEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
