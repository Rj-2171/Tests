import { StudentService } from './student.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as ResponsesStudent from '../../../interface/test.student.interface';
import * as ResponsesLogin from '../../../interface/login.signup.interface';
import { Router } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { LoginSignupService } from 'src/app/login-signup.service';
import * as LoginSignUpInterface from '../../../interface/login.signup.interface';
// import { ViewEncapsulation} from '@angular/core';



@Component({
  selector: 'app-container-student',
  templateUrl: './container-student.component.html',
  styleUrls: ['./container-student.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ContainerStudentComponent implements OnInit {

  public routes = [
    // { path: '', name: 'Home' },
    { path: 'my-tests', name: 'My Tests', icon: 'assignment' },
    { path: 'discussion', name: 'Discussion', icon: 'help_outline' },
    { path: 'videos', name: 'Videos', icon: 'movie' }
  ];

  private unsubscribe$ = new Subject();

  public testList: ResponsesStudent.ITestList[];
  public questionPaper: ResponsesStudent.IQuestionPaper[];
  public user: LoginSignUpInterface.IUser;


  public showTest: boolean = false;

  constructor(private router: Router,
    private _helper: StudentService,
    private _helper_login: LoginSignupService) { }

  ngOnInit() {


    this.user = JSON.parse(this._helper_login.getUser());

  }

  public startTest(test: ResponsesStudent.ITestList) {
    this.showTest = true;
    this.router.navigate(['/test', test._id]);
  }

  public logOut() {
    this._helper_login.doLogoutUser();
    this.router.navigate(['']);
  }

}
