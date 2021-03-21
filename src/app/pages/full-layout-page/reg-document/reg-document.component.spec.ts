import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDocumentComponent } from './reg-document.component';

describe('RegDocumentComponent', () => {
  let component: RegDocumentComponent;
  let fixture: ComponentFixture<RegDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
