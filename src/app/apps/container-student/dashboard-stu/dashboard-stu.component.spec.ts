import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStuComponent } from './dashboard-stu.component';

describe('DashboardStuComponent', () => {
  let component: DashboardStuComponent;
  let fixture: ComponentFixture<DashboardStuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
