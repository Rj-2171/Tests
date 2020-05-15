import { LoginSignupService } from './../../login-signup.service';
import { TeacherService } from './teacher.service';
import { Component, OnInit } from '@angular/core';
import { first, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as LoginSignUpInterface from '../../../interface/login.signup.interface';
import * as ResponsesTeacher from '../../../interface/test.teacher.interface';
import * as ResponsesLogin from '../../../interface/login.signup.interface';
import { Subject } from 'rxjs';
import { ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-container-teacher',
  templateUrl: './container-teacher.component.html',
  styleUrls: ['./container-teacher.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerTeacherComponent implements OnInit {

  public user: LoginSignUpInterface.IUser;

  public routes = [
    // { path: '', name: 'Home' },
    { path: 'analysis', name: 'Analysis', icon: 'bar_chart'},
    { path: 'tests', name: 'Tests', icon: 'assignment' },
    { path: 'discussions', name: 'Discussions', icon: 'help_outline' },
    { path: 'videos', name: 'Videos', icon: 'movie' }
  ];


  constructor(private _helper_login: LoginSignupService, private router: Router) { }

  public ngOnInit() {
    this.user = JSON.parse(this._helper_login.getUser());
  }

  public logOut() {
    this._helper_login.doLogoutUser();
    this.router.navigate(['']);
  }

}
