import { LoginSignupService } from './../../../login-signup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { first, takeUntil } from 'rxjs/operators';
import * as ResponsesLogin from '../../../../interface/login.signup.interface';
import * as ResponsesTeacher from '../../../../interface/test.teacher.interface';
import * as ResponsesStudent from '../../../../interface/test.student.interface';
import { TestList } from '../../../../interface/global.components.interface';
import { IUser } from '../../../../interface/login.signup.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tests-teacher',
  templateUrl: './tests-teacher.component.html',
  styleUrls: ['./tests-teacher.component.scss']
})
export class TestsTeacherComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  public addNewTest: boolean = false;
  public navigate: string = 'createTest';


  // public testList: TestList[] = [{ testName: 'Test1' }, { testName: 'Test2' }, { testName: 'Test3' }, { testName: 'Test4' }, { testName: 'Test5' }, { testName: 'Test6' }]
  public testList: ResponsesTeacher.IMyTestList[];
  public testListGlobal: ResponsesStudent.ITestList[];
  public testListSubjective: ResponsesTeacher.ISubjectiveTestDetail[];
  public testListSubjectiveGlobal: ResponsesStudent.ITestList[] = [];

  public isTestDetailIncomplete: boolean = false;

  public allInstitutes: Array<ResponsesLogin.IInstitutes>;
  public allClasses: Array<ResponsesLogin.IClasses>;
  public allSubjects: Array<ResponsesLogin.ISubjects>;
  public showSubjectDetails: boolean = true;
  public showAddQuestion: boolean = true;
  public showQuestionForm: boolean = false;
  public showuploadprogressbar : boolean = false ;

  public questionPaper: ResponsesTeacher.ITestPaperDetail;
  public teacherObj: IUser;
  public myTestsResponse: ResponsesTeacher.IMyTestListResponse;

  public title: string = '';
  public questionDesc: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public startTime: string = '';
  public duration: number;
  public totalMarks: number;
  public selectedSubject: ResponsesLogin.ISubjects;
  public selectedClass: ResponsesLogin.IClasses;
  public selectedInstitute: ResponsesLogin.IInstitutes;
  public subjectUnit: ResponsesTeacher.IUnit[] = [];
  public subjectWiseQuestion: ResponsesTeacher.IUnitWiseQuestion[] = [];
  public selectedQuestionCSV: File;
  public objPaperFilePath: string = '';
  public clickupload : boolean =false;

  // public question: string = '';
  // public option1: string = '';
  // public option2: string = '';
  // public option3: string = '';
  // public option4: string = '';
  // public answer: string = '';
  // public imgPath: string = '';
  // public selectedFile: File;

  // public isEdited: boolean = false;
  // public editingIndex: number = -1;

  //Subjective test variable
  public showSubjectiveDetails: boolean = false;
  public titleSb: string = '';
  public questionDescSb: string = '';
  public startDateSb: string = '';
  public endDateSb: string = '';
  public startTimeSb: string = '';
  public durationSb: number;
  public totalMarksSb: number;
  public paperPathSb: string = '';
  public selectedFileSb: File;
  public selectedSubjectSb: ResponsesLogin.ISubjects;
  public selectedClassSb: ResponsesLogin.IClasses;
  public selectedInstituteSb: ResponsesLogin.IInstitutes;
  public subjectivePaperDetails: ResponsesTeacher.ISubjectiveTestPaperDetail;

  constructor(private _router: Router,
    private _helper: TeacherService,
    private _helper_login: LoginSignupService,
    private toastr: ToastrService) { }


  ngOnInit() {
    this.teacherObj = JSON.parse(this._helper_login.getUser());
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
    this.getMyTests();
    this.getSubjectiveTest();
  }

  public createNewTest() {
    this.addNewTest = true;
    this.title = '';
    this.startDate = undefined;
    this.endDate = '';
    this.selectedSubject = undefined;
    this.selectedClass = undefined;
    this.selectedInstitute = undefined;
    this.questionDesc = '';
    this.startTime = '';
    this.duration = undefined;
    this.totalMarks = undefined;
    this.subjectUnit = [];
    this.subjectWiseQuestion = [];
    this.objPaperFilePath = '';
  }

  public navigateTo(type: string) {
    this.navigate = type;
  }

  public onSubjectChange(event) {
    this.selectedSubject = event;
    this.subjectWiseQuestion = [];
    this._helper.getSubjectWiseUnit(this.selectedSubject._id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.ISubjectWiseUnit) => {
        this.subjectUnit = res.unitList;
        this.subjectUnit.forEach(elem => {
          this.subjectWiseQuestion.push(<ResponsesTeacher.IUnitWiseQuestion>{
            unit: elem.unitName,
            noOfQuestion: undefined
          });
        });
        console.log(this.subjectWiseQuestion);
      });
  }
  public onClassChange(event) {
    this.selectedClass = event;
  }
  public onInstituteChange(event) {
    this.selectedInstitute = event;
  }
  public onObjectiveCSVSelect(event: any) {
    this.selectedQuestionCSV = event.target.files[0];
  }

  public getPBarWidth(){
    if(this.clickupload && !(this.showuploadprogressbar)){
    return { 'width' : '3%'};
    }
    if(this.showuploadprogressbar && this.clickupload ){
      return { 'width' : '100%'};
    }
  
  }




  public uploadObjectivePaper() {
    this.clickupload = true;
    setTimeout(() => {
     this.showuploadprogressbar = true;
     this.getPBarWidth();
  }, 2000); 
    
    const fd = new FormData();
    fd.append('video', this.selectedQuestionCSV, this.selectedQuestionCSV.name);
    this._helper.uploadVideo(fd)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.IVideoUploadResponse) => {
        if (res.success) {
          this.objPaperFilePath = res.videoLink;
          this.toastr.success('File uploaded successfully.');
          this.clickupload = false;
        }
        else {
          this.toastr.error('Unable to upload file.');
        }
      }, (err: Error) => {
        this.toastr.error('Unable to upload file.');
      });
  }

  public onObjectivePaperSubmission() {
    // var today = new Date();
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // if (+this.startDate.substr(0,4) < +date.substr(0,4) || +this.startDate.substr(5,2) < +date.substr(5,2)
    // || +this.startDate.substr(8,2) < +date.substr(8,2)) {
    //   this.toastr.error('Please enter appropriate date.');
    //   return;
    // }
    // if(this.endDate < this.startDate){
    //   this.toastr.error('Please enter appropriate date.');
    //   return;
    // }
    if (this.subjectWiseQuestion) {
      this.subjectWiseQuestion.forEach(elem => {
        if (elem.noOfQuestion === undefined || elem.noOfQuestion === null) {
          this.toastr.error('Please fill all the number of questions.');
          return;
        }
      });
    }
    if (this.title === '' || this.startDate === undefined || this.endDate === '' || !this.selectedSubject || !this.selectedClass
      || !this.selectedInstitute || this.questionDesc === '' || this.startTime === '' || this.duration === undefined ||
      this.totalMarks === undefined || this.subjectWiseQuestion === [] || this.objPaperFilePath === '') {
      this.toastr.error('Please fill all the details.');
      return;
    }
    this.questionPaper = {
      questionsUrl: this.objPaperFilePath,
      testTitle: this.title,
      public: false,
      startDate: this.startDate.toString(),
      endDate: this.endDate,
      duration: this.duration,
      description: this.questionDesc,
      class_id: this.selectedClass._id,
      subject_id: this.selectedSubject._id,
      institute_id: this.selectedInstitute._id,
      teacher_id: this.teacherObj._id,
      unitDistribution: this.subjectWiseQuestion,
      startTime: this.startTime,
      totalMarks: this.totalMarks
    };
    console.log(this.questionPaper);
    this._helper.submitObjectivePaper(this.questionPaper)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.ITestPaperSubmissionResponse) => {
        if (res.success) {
          this.toastr.success('Paper created successfully.');
          // this.showQuestionForm = false;
          this.addNewTest = false;
          this.getMyTests();
        }
        else {
          this.toastr.success('There was an error creating a test. Please try later.');
          // this.showQuestionForm = false;
        }
      }, (err: Error) => {
        this.toastr.success('There was an error creating a test. Please try later.');
      });
  }




  public backToTest(option: string) {
    // if (option === 'closeAddQuestion') {
    //   this.showQuestionForm = false;
    //   this.question = "";
    //   this.option1 = "";
    //   this.option2 = "";
    //   this.option3 = "";
    //   this.option4 = "";
    //   this.answer = "";
    //   this.imgPath = "";
    //   this.editingIndex = -1;
    //   this.isEdited = false;
    // }
    if (option === 'closeQuestionDetail') {
      this.addNewTest = false;
      this.title = '';
      this.startDate = undefined;
      this.endDate = '';
      this.selectedSubject = undefined;
      this.selectedClass = undefined;
      this.selectedInstitute = undefined;
      this.questionDesc = '';
      this.startTime = '';
      this.duration = undefined;
      this.totalMarks = undefined;
      this.subjectUnit = [];
      this.subjectWiseQuestion = [];
      this.objPaperFilePath = '';
    }
  }

  // public onSubmitTestPaperDetail() {
  //   if (this.title === '' || this.startDate === '' || this.endDate === '' || !this.selectedSubject || !this.selectedClass
  //     || !this.selectedInstitute || this.questionDesc === '') {
  //     this.toastr.error('Please fill all the details.');
  //     return;
  //   }
  //   this.showSubjectDetails = false;
  //   this.isTestDetailIncomplete = false;
  // }

  // public onFileSelect(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // public uploadImage() {
  //   const fd = new FormData();
  //   fd.append('photo', this.selectedFile, this.selectedFile.name);
  //   this._helper.uploadImage(fd)
  //     .pipe(first(), takeUntil(this.unsubscribe$))
  //     .subscribe((res: ResponsesTeacher.IImageUploadResponse) => {
  //       if (res.success) {
  //         this.isImageUploaded = true;
  //         this.imgPath = res.fileName;
  //         this.toastr.success('Image uploaded successfully.');
  //       }
  //       else {
  //         this.toastr.error('Unable to upload image.');
  //         this.isImageUploaded = false;
  //       }
  //     });
  // }

  // public onAddQuestion() {
  //   this.showQuestionForm = true;
  //   this.question = "";
  //   this.option1 = "";
  //   this.option2 = "";
  //   this.option3 = "";
  //   this.option4 = "";
  //   this.answer = "";
  //   this.imgPath = "";
  // }

  // public onAddQuestionDetail() {
  //   if (this.question === '' || this.option1 === '' || this.option2 === '' || this.option3 === '' || this.option4 === '' || this.answer === '') {
  //     this.toastr.error('Please fill all the details.');
  //     return;
  //   }
  //   this.showQuestionForm = false;
  //   this.questionList.push({
  //     question: this.question,
  //     option1: this.option1,
  //     option2: this.option2,
  //     option3: this.option3,
  //     option4: this.option4,
  //     answer: this.answer,
  //     image: this.imgPath
  //   });
  // }

  //delete question
  // public deleteQuestion(index: number){
  //   this.questionList.splice(index, 1);
  // }
  //edit question
  // public editQuestion(index: number){
  //   this.showQuestionForm = true;
  //   this.isEdited = true;
  //   this.editingIndex = index;
  //   this.question = this.questionList[index].question;
  //   this.option1 = this.questionList[index].option1;
  //   this.option2 = this.questionList[index].option2;
  //   this.option3 = this.questionList[index].option3;
  //   this.option4 = this.questionList[index].option4;
  //   this.answer = this.questionList[index].answer;
  //   this.imgPath = this.questionList[index].image;
  // }

  //edit question
  // public onUpdate(){
  //   if (this.question === '' || this.option1 === '' || this.option2 === '' || this.option3 === '' || this.option4 === '' || this.answer === '') {
  //     this.toastr.error('Please fill all the details.');
  //     return;
  //   }
  //   if(this.editingIndex > -1){
  //     this.questionList[this.editingIndex] = {
  //       question: this.question,
  //       option1: this.option1,
  //       option2: this.option2,
  //       option3: this.option3,
  //       option4: this.option4,
  //       answer: this.answer,
  //       image: this.imgPath
  //     }
  //   this.showQuestionForm = false;
  //   this.isEdited = false;
  //   this.editingIndex = -1;
  //   }
  // }

  // public onPaperSubmission() {
  //   if (this.isTestDetailIncomplete) {
  //     this.toastr.error('Incomplete test details.');

  //     return;
  //   }
  //   if (this.questionList.length === 0) {
  //     this.toastr.error('Please add questions.');
  //     return;
  //   }
  //   this.questionPaper = {
  //     testTitle: this.title,
  //     class_id: this.selectedClass._id,
  //     description: this.questionDesc,
  //     endDate: this.endDate.toString(),
  //     startDate: this.startDate.toString(),
  //     institute_id: this.selectedInstitute._id,
  //     public: true,
  //     subject_id: this.selectedSubject._id,
  //     // questions: this.questionList,
  //     teacher_id: this.teacherObj._id
  //   }
  //   this._helper.submitTestPaper(this.questionPaper)
  //     .pipe(first(), takeUntil(this.unsubscribe$))
  //     .subscribe((res: ResponsesTeacher.ITestPaperSubmissionResponse) => {
  //       if (res.success) {
  //         this.toastr.success('Paper created successfully.');
  //         this.showQuestionForm = false;
  //         this.addNewTest = false;
  //         this.getMyTests();
  //       }
  //       else {
  //         this.toastr.success('There was an error creating a test. Please try later.');
  //         this.showQuestionForm = false;
  //       }
  //     }, (err: Error) => {
  //       this.toastr.success('There was an error creating a test. Please try later.');
  //     });
  // }
  // public onAnswerChange(event: any) {
  //   const index = event.target.options.selectedIndex;
  //   this.answer = event.target.value;
  // }
  public getMyTests() {
    this._helper.getMyTests(this.teacherObj._id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.IMyTestListResponse) => {
        if (res) {
          this.myTestsResponse = res;
          this.testList = this.myTestsResponse.testList;
          this.testListGlobal = this.testList.map((element) => {
            return <ResponsesStudent.ITestList>{
              _id: element._id,
              testTitle: element.testTitle,
              startDate: element.startDate,
              endDate: element.endDate,
              public: element.public,
              description: element.description,
              subjectName: element.subject_id.subjectName,
              subjectImage: element.subject_id.subjectImage
            }
          });
        }
      }, (err: Error) => {
        console.log(err);
      });
  }

  //Subjective Test work!!!

  public createNewSubjectiveTest() {
    this.showSubjectiveDetails = true;
    this.titleSb = '';
    this.startDateSb = '';
    this.endDateSb = '';
    this.startTimeSb = '';
    this.durationSb = undefined;
    this.totalMarksSb = undefined;
    this.selectedSubjectSb = undefined;
    this.selectedClassSb = undefined;
    this.selectedInstituteSb = undefined;
    this.selectedFileSb = undefined;
    this.paperPathSb = '';
    this.questionDescSb = '';
  }

  public onSubjectChangeSb(event) {
    this.selectedSubjectSb = event;
  }
  public onClassChangeSb(event) {
    this.selectedClassSb = event;
  }
  public onInstituteChangeSb(event) {
    this.selectedInstituteSb = event;
  }

  public onSubjectivePaperSelect(event: any) {
    this.selectedFileSb = event.target.files[0];
  }

  public uploadSubjectivePaper() {
    const fd = new FormData();
    fd.append('video', this.selectedFileSb, this.selectedFileSb.name);
    this._helper.uploadVideo(fd)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.IVideoUploadResponse) => {
        if (res.success) {
          this.paperPathSb = res.videoLink;
          this.toastr.success('File uploaded successfully.');
        }
        else {
          this.toastr.error('Unable to upload file.');
        }
      }, (err: Error) => {
        this.toastr.error('Unable to upload file.');
      });
  }

  public backToSubjectiveTest() {
    this.showSubjectiveDetails = false;
    this.titleSb = '';
  }

  public onSubmitSubjectiveTestPaper() {
    if (this.paperPathSb === '' || this.titleSb === '' || this.startDateSb === '' || this.endDateSb === '' || this.startTimeSb === ''
      || this.durationSb === undefined || this.questionDescSb === '' || this.selectedClassSb === undefined || this.selectedSubjectSb === undefined
      || this.selectedInstituteSb === undefined || this.totalMarksSb === undefined) {
      this.toastr.error('Please fill all the details.');
      return;
    }
    this.subjectivePaperDetails = {
      questionPaperUrl: this.paperPathSb,
      testTitle: this.titleSb,
      public: false,
      startDate: this.startDateSb,
      endDate: this.endDateSb,
      startTime: this.startTimeSb,
      duration: this.durationSb,
      description: this.questionDescSb,
      class_id: this.selectedClassSb._id,
      subject_id: this.selectedSubjectSb._id,
      institute_id: this.selectedInstituteSb._id,
      teacher_id: this.teacherObj._id,
      totalMarks: this.totalMarksSb
    }
    this._helper.submitSubjectiveTest(this.subjectivePaperDetails)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.ISubmissionResponse) => {
        if (res.success) {
          this.toastr.success('Paper created successfully.');
          this.showSubjectiveDetails = false;
          this.getSubjectiveTest();
        }
        else {
          this.toastr.success('There was an error creating a test. Please try later.');
          this.showQuestionForm = false;
        }
      }, (err: Error) => {
        this.toastr.success('There was an error creating a test. Please try later.');
      });
  }

  public getSubjectiveTest() {
    this._helper.getSubjectiveTest(this.teacherObj._id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.IGetSubjectiveTest) => {
        if (res.success) {
          this.testListSubjective = res.testListSubjective;
          this.testListSubjectiveGlobal = res.testListSubjective.map((element) => {
            return <ResponsesStudent.ITestList>{
              _id: element._id,
              testTitle: element.testTitle,
              startDate: element.startDate,
              endDate: element.endDate,
              public: element.public,
              description: element.description,
              subjectName: element.subject_id.subjectName,
              subjectImage: element.subject_id.subjectImage
            }
          });
        }
      });
  }

  //End of Subjective paper work!!!
  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
