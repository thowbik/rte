import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesampleComponent } from './homesample.component';

describe('HomesampleComponent', () => {
  let component: HomesampleComponent;
  let fixture: ComponentFixture<HomesampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
