import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RteIntakecapacityComponent } from './rte-intakecapacity.component';

describe('RteIntakecapacityComponent', () => {
  let component: RteIntakecapacityComponent;
  let fixture: ComponentFixture<RteIntakecapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RteIntakecapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RteIntakecapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
