import { first, takeUntil } from 'rxjs/operators';
import { LoginSignupService } from './../../../login-signup.service';
import { TeacherService } from './../teacher.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as ResponsesLogin from '../../../../interface/login.signup.interface';
import * as ResponsesTeacher from '../../../../interface/test.teacher.interface';

@Component({
  selector: 'app-analysis-teacher',
  templateUrl: './analysis-teacher.component.html',
  styleUrls: ['./analysis-teacher.component.scss']
})
export class AnalysisTeacherComponent implements OnInit {

  private unsubscribe$ = new Subject();
  public teacherObj: ResponsesLogin.IUser;
  public testResultList: ResponsesTeacher.ITestAttempted[];
  public myTestsResponse: ResponsesTeacher.IMyTestListResponse;
  public testList: ResponsesTeacher.IMyTestList[];
  public editable:boolean = false;
  public editableMarks : number = 0;

  public subjectiveResult = [
    {
      regNo: 1122334455,
      name: "Manish Dalal",
      answer: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      marks: 20,
    },
    {
      regNo: 1232455533,
      name: "Preetam Singh",
      answer: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      marks: 35,
    },
    {
      regNo: 1454333332,
      name: "Amit Gupta",
      answer: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      marks: 44,
    },
    {
      regNo: 1143234455,
      name: "Rakesh Bharadwaj",
      answer: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      marks: 76,
    },

  ];
  constructor(
    private _helper: TeacherService,
    private _helper_login: LoginSignupService
  ) { }

  ngOnInit() {

    this.teacherObj = JSON.parse(this._helper_login.getUser());
    this.getMyTests();
    // this.getResultOfAllTest();

  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getAllResultOfATest(testId: string) {
    this._helper.getTeacherTestResult(this.teacherObj._id, testId)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: ResponsesTeacher.ITeacherResultResponse) => {
        this.testResultList = response.data.testAttempted;
      }, (err: Error) => {
        console.log(err);
      })
  }
  public clearTestResults() {
    this.testResultList = [];
  }

  public editMarks(regNo : number,marks : number){
    this.editableMarks = marks;
    this.editable = true;
  }

  public downloadCSVResult(testId: string){
    const url = 'https://prep-ease.herokuapp.com/teacher/getResultOfIndividualTestCSV' + '/' + this.teacherObj._id + '/' + testId;
    window.open(url, '_blank');
  }


  private getMyTests() {
    this._helper.getMyTests(this.teacherObj._id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.IMyTestListResponse) => {
        if (res) {
          this.myTestsResponse = res;
          this.testList = this.myTestsResponse.testList;

          // console.log(res);
        }
        else {
          console.log("Error");
        }
      }, (err: Error) => {
        console.log(err);
      });
  }

}
