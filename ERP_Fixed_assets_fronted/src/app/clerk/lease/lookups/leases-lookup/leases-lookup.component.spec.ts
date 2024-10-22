import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasesLookupComponent } from './leases-lookup.component';

describe('LeasesLookupComponent', () => {
  let component: LeasesLookupComponent;
  let fixture: ComponentFixture<LeasesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasesLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
