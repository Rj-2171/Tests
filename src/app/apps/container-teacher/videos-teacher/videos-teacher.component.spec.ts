import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosTeacherComponent } from './videos-teacher.component';

describe('VideosTeacherComponent', () => {
  let component: VideosTeacherComponent;
  let fixture: ComponentFixture<VideosTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
