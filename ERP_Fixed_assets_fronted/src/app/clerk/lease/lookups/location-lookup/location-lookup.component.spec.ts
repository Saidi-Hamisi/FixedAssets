import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLookupComponent } from './location-lookup.component';

describe('LocationLookupComponent', () => {
  let component: LocationLookupComponent;
  let fixture: ComponentFixture<LocationLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
