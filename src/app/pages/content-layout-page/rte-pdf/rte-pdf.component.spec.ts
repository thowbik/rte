import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtePdfComponent } from './rte-pdf.component';

describe('RtePdfComponent', () => {
  let component: RtePdfComponent;
  let fixture: ComponentFixture<RtePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
