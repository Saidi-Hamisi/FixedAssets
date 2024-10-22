import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLessorsComponent } from './manage-lessors.component';

describe('ManageLessorsComponent', () => {
  let component: ManageLessorsComponent;
  let fixture: ComponentFixture<ManageLessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
