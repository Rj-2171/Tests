import { UrlConstants } from './../../../const/const.url';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ResponsesLogin from '../../../interface/login.signup.interface';
import * as ResponsesTeacher from '../../../interface/test.teacher.interface';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private _http: HttpClient, private _url: UrlConstants) { }
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*',
  });

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // SET OPTIONS FOR THE SERVICES
  public options = {
    headers: this.headers
  };

  public uploadImage(fileData: FormData): Observable<ResponsesTeacher.IImageUploadResponse> {
    return this._http.post<ResponsesTeacher.IImageUploadResponse>(this._url.UPLOAD_IMAGE, fileData);
  }

  // public submitTestPaper(questionPaper: ResponsesTeacher.ITestPaperDetail): Observable<ResponsesTeacher.ITestPaperSubmissionResponse> {
  //   // return this._http.post<any>(this._url.CREATE_TEST_PAPER, { questionPaper }, this.options);
  //   return this._http.post<ResponsesTeacher.ITestPaperSubmissionResponse>(this._url.CREATE_TEST_PAPER, { questionPaper }, this.options);
  // }

  public submitObjectivePaper(questionPaper: ResponsesTeacher.ITestPaperDetail): Observable<ResponsesTeacher.ITestPaperSubmissionResponse> {
    return this._http.post<ResponsesTeacher.ITestPaperSubmissionResponse>(this._url.CREATE_OBJ_TEST, { questionPaper }, this.options);
  }

  public getSubjectWiseUnit(subjectId: string): Observable<ResponsesTeacher.ISubjectWiseUnit> {
    return this._http.get<ResponsesTeacher.ISubjectWiseUnit>(this._url.GET_SUBJECT_UNIT + "/" + subjectId, this.options);
  }

  public getMyTests(teacherId: string): Observable<ResponsesTeacher.IMyTestListResponse> {
    return this._http.get<ResponsesTeacher.IMyTestListResponse>(this._url.GET_TEACHER_MYTESTS + '/' + teacherId, this.options);
  }

  public uploadVideo(fileData: FormData): Observable<ResponsesTeacher.IVideoUploadResponse> {
    return this._http.post<ResponsesTeacher.IVideoUploadResponse>(this._url.UPLOAD_VIDEO, fileData);
  }

  public addVideo(videoDetail: ResponsesTeacher.IAddVideo): Observable<ResponsesTeacher.IVideoSubmissionResponse> {
    return this._http.post<ResponsesTeacher.IVideoSubmissionResponse>(this._url.ADD_VIDEO, videoDetail, this.options);
  }

  public getVideoByTeacher(teacherId: string): Observable<ResponsesTeacher.IMyVideoResponse> {
    return this._http.get<ResponsesTeacher.IMyVideoResponse>(this._url.GET_TEACHER_MYVIDEOS + '/' + teacherId, this.options);
  }

  public getTeacherTestResult(teacherId: string, testId: string): Observable<ResponsesTeacher.ITeacherResultResponse> {
    return this._http.get<ResponsesTeacher.ITeacherResultResponse>(this._url.GET_RESULT_FOR_TEACHER + '/' + teacherId + '/' + testId, {
      headers: this.headers
    });
  }
  // public getTeacherTestResultCSV(teacherId: string, testId: string): Observable<ResponsesTeacher.ITeacherResultResponse> {
  //   return this._http.get<ResponsesTeacher.ITeacherResultResponse>(this._url.GET_RESULT_FOR_TEACHER_CSV + '/' + teacherId + '/' + testId, {
  //     headers: this.headers
  //   });
  // }
  //SUBJECTIVE TEST SERVICE
  public submitSubjectiveTest(questionPaper: ResponsesTeacher.ISubjectiveTestPaperDetail): Observable<ResponsesTeacher.ISubmissionResponse> {
    return this._http.post<ResponsesTeacher.ISubmissionResponse>(this._url.CREATE_SUBJECTIVE_TEST, { questionPaper }, this.options);
  }
  public getSubjectiveTest(teacherId: string): Observable<ResponsesTeacher.IGetSubjectiveTest> {
    return this._http.get<ResponsesTeacher.IGetSubjectiveTest>(this._url.GET_SUBJECTIVE_TEST_FOR_TEACHER + '/' + teacherId, this.options);
  }

}
