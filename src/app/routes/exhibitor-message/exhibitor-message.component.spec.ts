import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToExhibitorComponent } from './to-exhibitor.component';

describe('ToExhibitorComponent', () => {
  let component: ToExhibitorComponent;
  let fixture: ComponentFixture<ToExhibitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToExhibitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToExhibitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
