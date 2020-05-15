import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionsTeacherComponent } from './discussions-teacher.component';

describe('DiscussionsTeacherComponent', () => {
  let component: DiscussionsTeacherComponent;
  let fixture: ComponentFixture<DiscussionsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionsTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
