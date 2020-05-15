import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTeachComponent } from './dashboard-teach.component';

describe('DashboardTeachComponent', () => {
  let component: DashboardTeachComponent;
  let fixture: ComponentFixture<DashboardTeachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTeachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
