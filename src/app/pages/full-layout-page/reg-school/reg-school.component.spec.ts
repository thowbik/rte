import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSchoolComponent } from './reg-school.component';

describe('RegSchoolComponent', () => {
  let component: RegSchoolComponent;
  let fixture: ComponentFixture<RegSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
