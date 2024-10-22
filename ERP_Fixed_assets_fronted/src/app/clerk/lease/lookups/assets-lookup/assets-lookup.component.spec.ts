import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsLookupComponent } from './assets-lookup.component';

describe('AssetsLookupComponent', () => {
  let component: AssetsLookupComponent;
  let fixture: ComponentFixture<AssetsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
