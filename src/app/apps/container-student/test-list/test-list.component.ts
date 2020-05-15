import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import * as ResponsesStudent from '../../../../interface/test.student.interface';
import { Router } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { LoginSignupService } from '../../../login-signup.service';
import * as LoginSignUpInterface from '../../../../interface/login.signup.interface';
import { ViewEncapsulation} from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestListComponent implements OnInit {

  private unsubscribe$ = new Subject();
  public user: LoginSignUpInterface.IStudentDetail;


  public testList: ResponsesStudent.ITestList[];
  public subjectiveTestList: ResponsesStudent.ISubjectiveTestList[];
  public subjectiveTestListGlobal: ResponsesStudent.ITestList[];
  public publicTestList: ResponsesStudent.ITestList[];
  public testResultList: ResponsesStudent.IStudentPastResult[];

  constructor(private _helper: StudentService,
    private _loginHelper: LoginSignupService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this._loginHelper.getUser());
    this.getMyAllTestList();
    this.getMyAllPublicTestList();
    this.getMyAllResults();
    this.getSubjectiveTest();
  }

  public showAlertMessage(message: String) {
    alert(message);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  public getMyAllTestList() {
    this._helper.getAllTest(this.user._id, this.user.stuClass_id, this.user.stuInstitute_id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: ResponsesStudent.ITestListDetail) => {
        this.testList = response.TestList;
        // console.log(this.testList);
      });
  }

  public getMyAllPublicTestList() {
    this._helper.getAllPublicTest(this.user.stuClass_id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: ResponsesStudent.ITestListDetail) => {
        this.publicTestList = response.TestList;
        // console.log(this.publicTestList);
      });
  }

  public startNewTest(testId: ResponsesStudent.ITestList) {
    this._helper.getQuestionPaper(testId._id)
    .pipe(first(), takeUntil(this.unsubscribe$))
    .subscribe((response: ResponsesStudent.IQuestionPaperDetail) => {
      if(response.msg === 'Test Time Out'){
        this.toastr.error('Test conduction time exceeded.');
      }
      else if(response.questionsList.length > 0) {
        const duration = response.duration * 60;
        this.router.navigate(['test', testId._id, duration]);
      }
      // this.questionPaper = response.questionsList;
      // this.questionNumber = 0;
      // this.singleQuestion = this.questionPaper[this.questionNumber];
      // this.testTitle = response.testTitle;
      // this.savedAnswer = this.singleQuestion.selectedOption;
      // console.log(response);
    }, (err: Error) => {
      this.toastr.error('Unable to load test.');
    });
  }


  public getMyAllResults() {
    this._helper.getPastResultStudent(this.user._id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: ResponsesStudent.IStudentResultResponse) => {
        console.log(response);
        this.testResultList = response.pastResults;
      },
        (err: Error) => {
          console.log(err);
        });
  }

  //Subjective test work

  public getSubjectiveTest(){
    this._helper.getSubjectiveTest(this.user._id, this.user.stuClass_id, this.user.stuInstitute_id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesStudent.IGetSubjectivePaper) => {
        if(res.success){
          this.subjectiveTestList = res.TestList;
          this.subjectiveTestListGlobal = this.subjectiveTestList;
        }
      },
        (err: Error) => {
          console.log(err);
        });
}
}
