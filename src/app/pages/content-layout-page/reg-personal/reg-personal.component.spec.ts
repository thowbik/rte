import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPersonalComponent } from './reg-personal.component';

describe('RegPersonalComponent', () => {
  let component: RegPersonalComponent;
  let fixture: ComponentFixture<RegPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
