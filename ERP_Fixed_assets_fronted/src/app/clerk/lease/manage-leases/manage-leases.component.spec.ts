import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeasesComponent } from './manage-leases.component';

describe('ManageLeasesComponent', () => {
  let component: ManageLeasesComponent;
  let fixture: ComponentFixture<ManageLeasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLeasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
