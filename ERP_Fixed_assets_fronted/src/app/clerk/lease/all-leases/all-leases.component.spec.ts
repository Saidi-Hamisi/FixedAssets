import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeasesComponent } from './all-leases.component';

describe('AllLeasesComponent', () => {
  let component: AllLeasesComponent;
  let fixture: ComponentFixture<AllLeasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLeasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
