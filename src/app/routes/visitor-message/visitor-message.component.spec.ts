import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAudienceComponent } from './to-audience.component';

describe('ToAudienceComponent', () => {
  let component: ToAudienceComponent;
  let fixture: ComponentFixture<ToAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
