import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorDetailsComponent } from './lessor-details.component';

describe('LessorDetailsComponent', () => {
  let component: LessorDetailsComponent;
  let fixture: ComponentFixture<LessorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
