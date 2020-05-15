import { IInstitutes, IClasses, IQualification } from './../../../interface/login.signup.interface';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import * as LoginSignUpInterface from '../../../interface/login.signup.interface';
import { LoginSignupService } from '../../login-signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss','./login-signup-media-queries.scss']
})
export class LoginSignupComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public username: string = '';
  public loginpassword: string = '';

  public allInstitutes: Array<LoginSignUpInterface.IInstitutes>;
  public allClasses: Array<LoginSignUpInterface.IClasses>;
  public allQualification: Array<LoginSignUpInterface.ITQualification>;
  public userLoginResponse: LoginSignUpInterface.ILoginResponse;
  public showSignup: boolean = false;
  public showSignin: boolean = true;
  public formNavigate: number = 1;
  public userType: string = '';
  public user: LoginSignUpInterface.IUser;
  public studentDetails: LoginSignUpInterface.IStudentDetail;
  public teacherDetails: LoginSignUpInterface.ITeacherDetail;
  public temp: any;

  public status: boolean = false;
  public message: string = '';
  public statusType: string = '';

  //formgroup for student
  public studentForm: FormGroup;
  //formgroup for teaher
  public teacherForm: FormGroup;

  public genderList = ['Male', 'Female', 'Others'];

  constructor(
    private _helper: LoginSignupService,
    private _route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  public ngOnInit() {


    this.studentForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneno: ['', Validators.required],
      genderStu: ['', [Validators.required]],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      parentName: ['', Validators.required],
      parentEmail: ['', Validators.required],
      parentPhoneno: ['', Validators.required],
      parentQual: ['', [Validators.required]],
      classStu: ['', [Validators.required]],
      instituteStu: ['', [Validators.required]],
      mediumStu: ['', [Validators.required]]
      // temp: ['', Validators.required]    
    });

    this.teacherForm = this.fb.group({
      firstnameTeacher: ['', Validators.required],
      lastnameTeacher: ['', Validators.required],
      phonenoTeacher: ['', Validators.required],
      genderTeacher: ['', [Validators.required]],
      dobTeacher: ['', Validators.required],
      emailTeacher: ['', Validators.required],
      passwordTeacher: ['', Validators.required],
      confirmPasswordTeacher: ['', Validators.required],
      qualTeacher: ['', Validators.required],
      instTeacher: ['', Validators.required],
      yearOfExpTeacher: ['', Validators.required]
      // temp: ['', Validators.required]    
    });


    this._route.params.subscribe(type => this.userType = type.id);

    if (this._helper.isLoggedIn()) {
      this.user = JSON.parse(this._helper.getUser());
      if (this.user.userType) {
        if (this.user.userType === 'student') {
          this.router.navigate(['/dashboard-student']);
        } else {
          this.router.navigate(['/dashboard-teacher']);
        }
      }
    }


    // console.log(this.userType);

    this._helper.getAllInstitutes()
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((instituteList: LoginSignUpInterface.IGetAllInstitutes) => {
        this.allInstitutes = instituteList.Institutes;
        // console.log(this.allInstitutes);
      });
    this._helper.getAllClasses()
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((classList: LoginSignUpInterface.IGetAllClasses) => {
        this.allClasses = classList.Classes;
      });
    this._helper.getQualification()
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((qualificationList: LoginSignUpInterface.IAllQualification) => {
        this.allQualification = qualificationList.Classes;
      })

  }

  public onNavigate(component: string) {
    if (component === 'signup') {
      this.showSignup = true;
      this.showSignin = false;
    }
    if (component === 'signin') {
      this.showSignin = true;
      this.showSignup = false;
    }
  }

  public onBackToHome() {
    this.router.navigate(['']);
  }

  //close popup
  public closePopup(status: boolean) {
    this.status = status;
  }

  public changeGender(e) {
    this.studentForm.get('genderStu').setValue(e);
  }

  public changeGenderTeacher(e) {
    this.teacherForm.get('genderTeacher').setValue(e);
  }

  public onSignin() {
    if (!this.username) {
      // this.status = true;
      // this.statusType = 'error';
      // this.message = 'Enter username.';
      this.toastr.error('Username cannot be empty');
      return;
    }
    if (!this.loginpassword) {
      // this.status = true;
      // this.statusType = 'error';
      // this.message = 'Enter password.';
      this.toastr.error('Password cannot be empty');
      return;
    }
    this._helper.signin(this.username, this.loginpassword, this.userType)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: boolean) => {
        if (response) {
          this.user = JSON.parse(this._helper.getUser());
          if (this.user.userType === 'student') {
            this.router.navigate(['/dashboard-student']);
          } else {
            this.router.navigate(['/dashboard-teacher']);
          }
        }
        else {
          // this.status = true;
          // this.statusType = 'error';
          // this.message = 'Error in signin.';
          this.toastr.error('Error in signin.');
        }
      });
  }
  //student dropdown get method
  public getParentQualification(e: IQualification) {
    this.studentForm.get('parentQual').setValue(e);
  }
  public getStudentInstitutes(e: IInstitutes) {
    this.studentForm.get('instituteStu').setValue(e);
  }

  public getParentQualificationTeacher(e: IQualification) {
    this.teacherForm.get('qualTeacher').setValue(e);
  }
  public getStudentInstitutesTeacher(e: IInstitutes) {
    this.teacherForm.get('instTeacher').setValue(e);
  }
  public getMedium(e: string) {
    this.studentForm.get('mediumStu').setValue(e);
  }
  public getClass(e: IClasses) {
    this.studentForm.get('classStu').setValue(e);
  }

  //teacher detail get method
  public onStudentSignUp() {
    if (this.studentForm.value.password !== this.studentForm.value.confirmPassword) {
      // this.status = true;
      // this.statusType = 'error';
      // this.message = 'Password and confirm password should match.';
      this.toastr.error('Password and confirm password should match.');
      // alert('Password mismatch.');
      return;
    }

    if (this.studentForm.valid) {
      this.studentDetails = {
        name: this.studentForm.value.firstname + " " + this.studentForm.value.lastname,
        email: this.studentForm.value.email,
        userType: this.userType,
        password: this.studentForm.value.password,
        phoneNo: this.studentForm.value.phoneno,
        dob: this.studentForm.value.dob,
        gender: this.studentForm.value.genderStu,
        parentsName: this.studentForm.value.parentName,
        parentsQual: this.studentForm.value.parentQual._id,
        parentsEmail: this.studentForm.value.parentEmail,
        parentsPhNo: this.studentForm.value.parentPhoneno,
        stuClass_id: this.studentForm.value.classStu._id,
        stuInstitute_id: this.studentForm.value.instituteStu._id,
        medium: this.studentForm.value.mediumStu
      }

      this._helper.registerStudent(this.studentDetails)
        .pipe(first(), takeUntil(this.unsubscribe$))
        .subscribe((response: LoginSignUpInterface.IRegistrationResponse) => {
          if (response.success) {
            this.status = true;
            this.statusType = 'success';
            this.message = 'Registered successfully.';
            // alert('Registered successfully.');
            this.toastr.success('Registered successfully.');
            this.showSignin = true;
            this.showSignup = false;
          }
          else {
            this.status = true;
            this.statusType = 'error';
            this.message = 'Error in login.';
            // alert("Error in login.");
            this.toastr.error('Error in login.');
          }
        });
    }
    else {
      this.status = true;
      this.statusType = 'error';
      this.message = 'Please fill correct details or any field may be empty.';
      // alert('Please fill correct details or any field may be empty.');
    }
  }

  public onTeacherSignUp() {
    // console.log(this.studentForm);
    // console.log('a');
    if (this.userType === 'teacher') {
      if (this.teacherForm.value.passwordTeacher === this.teacherForm.value.confirmPasswordTeacher) {
        if (this.teacherForm.valid) {
          this.teacherDetails = {
            name: this.teacherForm.value.firstnameTeacher + " " + this.teacherForm.value.lastnameTeacher,
            email: this.teacherForm.value.emailTeacher,
            userType: this.userType,
            password: this.teacherForm.value.passwordTeacher,
            phoneNo: this.teacherForm.value.phonenoTeacher,
            dob: this.teacherForm.value.dobTeacher,
            gender: this.teacherForm.value.genderTeacher,
            qualification_id: this.teacherForm.value.qualTeacher._id,
            institute_id: this.teacherForm.value.instTeacher._id,
            yearOfExp: this.teacherForm.value.yearOfExpTeacher
          }
          this._helper.registerTeacher(this.teacherDetails)
            .pipe(first(), takeUntil(this.unsubscribe$))
            .subscribe((response: LoginSignUpInterface.IRegistrationResponse) => {
              if (response.success) {
                this.status = true;
                this.statusType = 'success';
                this.message = 'Registered successfully.';
                // alert('Registered Successfully.');
                this.showSignin = true;
                this.showSignup = false;
              }
              else {
                this.status = true;
                this.statusType = 'error';
                this.message = 'Error in login.';
                // alert("Error in login.");
              }
            });
        }
        else {
          this.status = true;
          this.statusType = 'error';
          this.message = 'Please fill correct details or any field may be empty.';
          // alert('Please fill correct details or any field may be empty.');
        }
      }
      else {
        this.status = true;
        this.statusType = 'error';
        this.message = 'Password and confirm password should match.';
        // alert('Password and Confirm Password should match');
        return;
      }
    }
  }

  public onFormNavigation(navHeader: number) {
    this.formNavigate = navHeader;
  }
  public onNextClick() {
    this.formNavigate = this.formNavigate + 1;
  }

  public onPrevClick() {
    this.formNavigate = this.formNavigate - 1;
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
