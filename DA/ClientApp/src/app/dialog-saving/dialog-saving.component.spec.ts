import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSavingComponent } from './dialog-saving.component';

describe('DialogSavingComponent', () => {
  let component: DialogSavingComponent;
  let fixture: ComponentFixture<DialogSavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSavingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
