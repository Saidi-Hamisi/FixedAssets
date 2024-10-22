import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLessorsComponent } from './all-lessors.component';

describe('AllLessorsComponent', () => {
  let component: AllLessorsComponent;
  let fixture: ComponentFixture<AllLessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
