import { Component, OnInit,OnDestroy } from '@angular/core';
import { LoginSignupService } from '../../../login-signup.service';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { StudentService } from '../student.service';
import * as ResponsesStudent from '../../../../interface/test.student.interface';
import * as ResponsesLogin from '../../../../interface/login.signup.interface';

@Component({
  selector: 'app-videos',
  templateUrl: './video-student.component.html',
  styleUrls: ['./video-student.component.scss']
})
export class VideoStudentComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  public videoList: ResponsesStudent.IVideoList[];

  public selectedSubject: ResponsesLogin.ISubjects;
  public selectedClass: ResponsesLogin.IClasses;
  public selectedInstitute: ResponsesLogin.IInstitutes;

  public allInstitutes: Array<ResponsesLogin.IInstitutes>;
  public allClasses: Array<ResponsesLogin.IClasses>;
  public allSubjects: Array<ResponsesLogin.ISubjects>;

  constructor(
    private _helper: StudentService,
    private _helper_login: LoginSignupService
  ) { }

  public ngOnInit() {
    this._helper_login.getAllInstitutes()
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((instituteList: ResponsesLogin.IGetAllInstitutes) => {
        this.allInstitutes = instituteList.Institutes;
      });
    this._helper_login.getAllClasses()
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((classList: ResponsesLogin.IGetAllClasses) => {
        this.allClasses = classList.Classes;
      });
    this._helper_login.getAllSubjects()
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((subjectList: ResponsesLogin.IGetAllSubjects) => {
        this.allSubjects = subjectList.Subjects;
      });
  }

  public onSubjectChange(event) {
    this.selectedSubject = event;
  }
  public onClassChange(event) {
    this.selectedClass = event;
  }
  public onInstituteChange(event) {
    this.selectedInstitute = event;
  }

  public getVideo(){
    this._helper.getVideo(this.selectedSubject._id, this.selectedClass._id, this.selectedInstitute._id)
    .pipe(first(), takeUntil(this.unsubscribe$))
    .subscribe((res: ResponsesStudent.IMyVideoResponse) => {
      if(res){
        this.videoList = res.data;
        console.log(this.videoList)
      }
      else{
        console.log(Error);
      }
    }, (err:Error) => {
      console.log(err, "Error");
    });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
