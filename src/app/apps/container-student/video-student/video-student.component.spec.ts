import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStudentComponent } from './video-student.component';

describe('VideoStudentComponent', () => {
  let component: VideoStudentComponent;
  let fixture: ComponentFixture<VideoStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
