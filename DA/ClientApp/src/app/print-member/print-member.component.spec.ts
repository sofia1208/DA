import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMemberComponent } from './print-member.component';

describe('PrintMemberComponent', () => {
  let component: PrintMemberComponent;
  let fixture: ComponentFixture<PrintMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
