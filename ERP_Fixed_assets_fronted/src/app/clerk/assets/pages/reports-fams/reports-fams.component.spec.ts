import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFamsComponent } from './reports-fams.component';

describe('ReportsFamsComponent', () => {
  let component: ReportsFamsComponent;
  let fixture: ComponentFixture<ReportsFamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsFamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
