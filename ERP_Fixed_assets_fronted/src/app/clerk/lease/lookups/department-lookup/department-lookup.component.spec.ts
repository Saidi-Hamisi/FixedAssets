import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentLookupComponent } from './department-lookup.component';

describe('DepartmentLookupComponent', () => {
  let component: DepartmentLookupComponent;
  let fixture: ComponentFixture<DepartmentLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
