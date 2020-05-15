import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { UrlConstants } from './../const/const.url';
import * as Responses from '../interface/login.signup.interface';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER = 'USER';
  private loggedUser: Responses.ILoginResponse;
  private userType: string;
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

  constructor(private _http: HttpClient, private _url: UrlConstants, private toastr: ToastrService) { }


  public getAllInstitutes(): Observable<Responses.IGetAllInstitutes> {
    return this._http.get<Responses.IGetAllInstitutes>(this._url.ALL_INSTITUTES, this.options);
  }

  public getAllClasses(): Observable<Responses.IGetAllClasses> {
    return this._http.get<Responses.IGetAllClasses>(this._url.ALL_CLASSES, this.options);
  }

  public getAllSubjects(): Observable<Responses.IGetAllSubjects> {
    return this._http.get<Responses.IGetAllSubjects>(this._url.ALL_SUBJECT, this.options);
  }

  public getQualification(): Observable<Responses.IAllQualification> {
    return this._http.get<Responses.IAllQualification>(this._url.ALL_QUALIFICATIONS, this.options);
  }

  //service for student registration
  public registerStudent(studentDetail: Responses.IStudentDetail): Observable<Responses.IRegistrationResponse> {
    return this._http.post<Responses.IRegistrationResponse>(this._url.STUDENT_REGISTRATION, studentDetail, this.options);
  }

  //service for teacher registration
  public registerTeacher(teacherDetail: Responses.ITeacherDetail): Observable<Responses.IRegistrationResponse> {
    return this._http.post<Responses.IRegistrationResponse>(this._url.TEACHER_REGISTRATION, teacherDetail, this.options);
  }

  public signin(emailId: string, password: string, userType: string): Observable<boolean> {
    return this._http.post<Responses.ILoginResponse>(this._url.USER_AUTHENTICATION, {
      email: emailId,
      password: password,
      userType: userType
    }, this.httpOptions)
      .pipe(
        tap((response: Responses.ILoginResponse) => {
          this.userType = response.user.userType;
          if (!response.success) {
            this.toastr.error(response.msg);
          }
          this.doLoginUser(response);
        }, (error: Error) => {
          console.log(error);
        }),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public isLoggedIn() {
    return !!this.getJwtToken();
  }

  public getUser() {
    return localStorage.getItem(this.USER);
  }

  private doLoginUser(user: Responses.ILoginResponse) {
    this.loggedUser = user;
    localStorage.setItem(this.USER, JSON.stringify(user.user));
    this.storeTokens({
      jwt: user.token,
      refreshToken: user.refreshToken
    });
  }

  public doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Responses.ITokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER);
  }
}
