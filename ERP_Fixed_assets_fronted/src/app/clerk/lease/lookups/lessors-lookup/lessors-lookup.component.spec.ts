import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorsLookupComponent } from './lessors-lookup.component';

describe('LessorsLookupComponent', () => {
  let component: LessorsLookupComponent;
  let fixture: ComponentFixture<LessorsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessorsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
