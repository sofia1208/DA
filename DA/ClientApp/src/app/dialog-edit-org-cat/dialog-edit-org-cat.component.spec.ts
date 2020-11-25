import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOrgCatComponent } from './dialog-edit-org-cat.component';

describe('DialogEditOrgCatComponent', () => {
  let component: DialogEditOrgCatComponent;
  let fixture: ComponentFixture<DialogEditOrgCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditOrgCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOrgCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
