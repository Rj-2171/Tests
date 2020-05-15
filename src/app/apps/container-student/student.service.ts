import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { UrlConstants } from './../../../const/const.url';
import * as Responses from '../../../interface/test.student.interface';
import { tap, mapTo, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

  public getAllTest(userId: string, classId: string, instituteId: string): Observable<Responses.ITestListDetail> {
    return this._http.get<Responses.ITestListDetail>(this._url.GET_All_TEST_STUDENTS + '/' + userId + '/' + classId + '/' + instituteId, { headers: this.headers })
  }

  public getAllPublicTest(classId: string): Observable<Responses.ITestListDetail> {
    return this._http.get<Responses.ITestListDetail>(this._url.GET_PUBLIC_TESTS_STUDENTS + '/' + classId, this.options);
  }

  public getQuestionPaper(testId: string): Observable<Responses.IQuestionPaperDetail> {
    // let httpParams = new HttpParams().set('id', testId)
    return this._http.get<Responses.IQuestionPaperDetail>(this._url.START_TEST + '/' + testId, {
      headers: this.headers
    });
  }

  public submitTest(submitData: Responses.ISubmitAnswer): Observable<Responses.ITestResult> {
    return this._http.post<Responses.ITestResult>(this._url.SUBMIT_TEST, submitData, this.options);
  }

  public getPastResultStudent(userId: string) {
    return this._http.get<Responses.IStudentResultResponse>(this._url.GET_RESULT_FOR_STUDENTS + '/' + userId, { headers: this.headers });
  }

  public getVideo(subjectId: string, classId: string, instituteId: string): Observable<Responses.IMyVideoResponse> {
    return this._http.get<Responses.IMyVideoResponse>(this._url.GET_STUDENT_MYVIDEOS + '/' + subjectId + '/' + classId + '/' + instituteId, this.options);
  }

  public getSubjectiveTest(userId: string, classId: string, instituteId: string): Observable<Responses.IGetSubjectivePaper> {
    return this._http.get<Responses.IGetSubjectivePaper>(this._url.GET_SUBJECTIVE_TEST_FOR_STUDENT + '/' + userId + '/' + classId + '/' + instituteId, this.options);
  }

}
