import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodianLookupComponent } from './custodian-lookup.component';

describe('CustodianLookupComponent', () => {
  let component: CustodianLookupComponent;
  let fixture: ComponentFixture<CustodianLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustodianLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustodianLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
