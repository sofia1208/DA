import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteMemberComponent } from './dialog-delete-member.component';

describe('DialogDeleteMemberComponent', () => {
  let component: DialogDeleteMemberComponent;
  let fixture: ComponentFixture<DialogDeleteMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
