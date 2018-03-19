import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalListComponent } from './terminal-list.component';

describe('TerminalListComponent', () => {
  let component: TerminalListComponent;
  let fixture: ComponentFixture<TerminalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
