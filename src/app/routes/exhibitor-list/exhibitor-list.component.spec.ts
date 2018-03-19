import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorListComponent } from './exhibitor-list.component';

describe('ExhibitorListComponent', () => {
  let component: ExhibitorListComponent;
  let fixture: ComponentFixture<ExhibitorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
