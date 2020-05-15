import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTeacherComponent } from './container-teacher.component';

describe('ContainerTeacherComponent', () => {
  let component: ContainerTeacherComponent;
  let fixture: ComponentFixture<ContainerTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
