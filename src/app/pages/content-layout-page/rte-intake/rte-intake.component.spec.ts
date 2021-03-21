import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RteIntakeComponent } from './rte-intake.component';

describe('RteIntakeComponent', () => {
  let component: RteIntakeComponent;
  let fixture: ComponentFixture<RteIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RteIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RteIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
