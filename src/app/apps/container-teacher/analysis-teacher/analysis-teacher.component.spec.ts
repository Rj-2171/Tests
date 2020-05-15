import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTeacherComponent } from './analysis-teacher.component';

describe('AnalysisTeacherComponent', () => {
  let component: AnalysisTeacherComponent;
  let fixture: ComponentFixture<AnalysisTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
