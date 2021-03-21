import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegParentComponent } from './reg-parent.component';

describe('RegParentComponent', () => {
  let component: RegParentComponent;
  let fixture: ComponentFixture<RegParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
