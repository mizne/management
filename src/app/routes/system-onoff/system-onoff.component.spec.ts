import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformMsgComponent } from './platform-msg.component';

describe('PlatformMsgComponent', () => {
  let component: PlatformMsgComponent;
  let fixture: ComponentFixture<PlatformMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
