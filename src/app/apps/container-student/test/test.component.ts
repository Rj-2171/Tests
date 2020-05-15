import { LoginSignupService } from './../../../login-signup.service';
import { StudentService } from './../student.service';
import { Component, OnInit, ViewChild, HostListener, Inject } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { first, takeUntil } from 'rxjs/operators';
import * as ResponsesStudent from '../../../../interface/test.student.interface';
import * as LoginSignUpInterface from '../../../../interface/login.signup.interface';

import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('countdown', { static: true }) counter: CountdownComponent;
  public testId: string = '';
  public showResultBoolean: boolean = false;
  private unsubscribe$ = new Subject();
  public questionPaper: ResponsesStudent.IQuestionPaper[];
  public questionNumber: number;
  public singleQuestion: ResponsesStudent.IQuestionPaper;
  public questionListNumber: Array<number> = [1, 2, 3, 4, 5, 6];
  public testTitle: string = '';
  public saveNextDisabled: boolean = false;
  public optionSelected: string = '';
  public answerList: ResponsesStudent.ISavedAnswer[] = [];
  public submitTestAnswer: ResponsesStudent.ISubmitAnswer;
  public obtainedResult: ResponsesStudent.IResult;
  public user: LoginSignUpInterface.IUser;
  public tempAnswer: string;
  public savedAnswer: string;
  public duration: number = undefined;


  constructor(private _route: ActivatedRoute,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private _loginHelper: LoginSignupService,
    private _helper: StudentService
  ) {
    this.preventBackClick();
  }

  ngOnInit() {
    this._route.params.subscribe(type => {
      this.testId = type.id;
      this.duration = type.d;
    });
    this.user = JSON.parse(this._loginHelper.getUser());
    // console.log(this.testId);
    if (!!this.testId) {
      this.setScreenData();
    }

  }

  public setScreenData() {
    // GET THE TEST DATA
    this._helper.getQuestionPaper(this.testId)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: ResponsesStudent.IQuestionPaperDetail) => {
        this.questionPaper = response.questionsList;
        this.questionNumber = 0;
        this.singleQuestion = this.questionPaper[this.questionNumber];
        this.testTitle = response.testTitle;
        this.savedAnswer = this.singleQuestion.selectedOption;
        this.duration = response.duration * 60;
        // console.log(response);
      });
  }

  public onQuestionNumberClick(questionNumber: number) {
    this.questionNumber = questionNumber;
    this.optionSelected = '';
    this.singleQuestion = this.questionPaper[this.questionNumber];
    this.savedAnswer = this.singleQuestion.selectedOption;
    // this.commonFunctionOnQuestionChange();
  }


  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public prevQuestion() {
    if (this.questionNumber === 0) {
      this.questionNumber = this.questionPaper.length - 1;
      this.singleQuestion = this.questionPaper[this.questionNumber];
    } else {
      this.questionNumber -= 1;
      this.singleQuestion = this.questionPaper[this.questionNumber];
    }

    this.optionSelected = '';
    this.savedAnswer = this.singleQuestion.selectedOption;
    // this.commonFunctionOnQuestionChange();

  }

  public nextQuestion() {
    if (this.questionNumber === this.questionPaper.length - 1) {
      this.questionNumber = 0;
      this.singleQuestion = this.questionPaper[this.questionNumber];
    } else {
      this.questionNumber += 1;
      this.singleQuestion = this.questionPaper[this.questionNumber];
    }
    this.optionSelected = '';
    this.savedAnswer = this.singleQuestion.selectedOption;
  }

  public saveAndNext() {
    if (!!this.optionSelected) {
      if (!!this.singleQuestion.selectedOption) {
        const index = this.answerList.indexOf(this.answerList.find(elem => elem.question_id === this.singleQuestion.question_id));
        this.answerList[index].answer = this.optionSelected;
      } else {
        this.answerList.push({
          question_id: this.singleQuestion.question_id,
          answer: this.optionSelected
        });
      }
      this.singleQuestion.selectedOption = this.optionSelected;
      this.optionSelected = '';
      this.nextQuestion();
    }
  }

  public optionSelect(optionNumber: string) {
    this.optionSelected = optionNumber;
    this.savedAnswer = '';
  }

  public checkQuestionColor(question: ResponsesStudent.IQuestionPaper) {

    if (question.question_id === this.singleQuestion.question_id) {
      return 'coral';
    }

    if (this.answerList.some((x) => x.question_id === question.question_id)) {
      return 'green';
    }

    if (question.selectedOption === '') {
      return '';
    }

  }

  public submitTest() {

    this.submitTestAnswer = {
      student_id: this.user._id,
      test_id: this.testId,
      answersList: this.answerList
    };
    // console.table(this.submitTestAnswer.answersList);

    this._helper.submitTest(this.submitTestAnswer)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: ResponsesStudent.ITestResult) => {
        if (response.success) {
          this.obtainedResult = response.result;
          // console.log(response);
          this.showResultBoolean = true;
        }
      })
  }


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }

  public timeOver($event){
    if(!($event.left > 0))  {
      this.submitTest();
    }
  }
  public exitTest() {
    this.showResultBoolean = false;
    // this.router.navigate()
    this.router.navigate(['dashboard-student']);

  }

  private preventBackClick() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

}

