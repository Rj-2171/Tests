import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginSignupService } from './../../../login-signup.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { first, takeUntil } from 'rxjs/operators';
import * as ResponsesLogin from '../../../../interface/login.signup.interface';
import * as ResponsesTeacher from '../../../../interface/test.teacher.interface';
import { TestList } from '../../../../interface/global.components.interface';
import { IUser } from '../../../../interface/login.signup.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-videos-teacher',
  templateUrl: './videos-teacher.component.html',
  styleUrls: ['./videos-teacher.component.scss']
})
export class VideosTeacherComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  public showVideoDetail: boolean = false;
  public isVideoUploaded: boolean = false;

  public allInstitutes: Array<ResponsesLogin.IInstitutes>;
  public allClasses: Array<ResponsesLogin.IClasses>;
  public allSubjects: Array<ResponsesLogin.ISubjects>;

  public title: string = '';
  public videoDesc: string = '';
  public selectedSubject: ResponsesLogin.ISubjects;
  public selectedClass: ResponsesLogin.IClasses;
  public selectedInstitute: ResponsesLogin.IInstitutes;
  public selectedFile: File;
  public videoPath: string = '';

  public videoDetail: ResponsesTeacher.IAddVideo;
  public videoList: ResponsesTeacher.IVideoList[];

  public teacherObj: IUser;

  public status: boolean = false;
  public message: string = '';
  public statusType: string = '';

  constructor(
    private _helper: TeacherService,
    private _helper_login: LoginSignupService,
    private toastr: ToastrService
  ) { }

  public ngOnInit() {
    this.teacherObj = JSON.parse(this._helper_login.getUser());
    this.getMyVideo();

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
  }

  public onSubjectChange(event) {
    this.selectedSubject = event;
  }
  public onClassChange(event) {
    this.selectedClass = event;
  }
  public onInstituteChange(event) {
    this.selectedInstitute = event;
  }

  public onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  public uploadVideo() {
    const fd = new FormData();
    fd.append('video', this.selectedFile, this.selectedFile.name);
    this._helper.uploadVideo(fd)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.IVideoUploadResponse) => {
        if (res.success) {
          this.isVideoUploaded = true;
          this.videoPath = res.videoLink;
          // console.log(res);
          // this.status = true;
          // this.message = "Video uploaded successfully.";
          // this.statusType = "success";
          this.toastr.success('Video uploaded successfully.');
        }
        else {
          // this.status = true;
          // this.message = "Unable to upload video.";
          // this.statusType = "error";
          this.toastr.error('Unable to upload video.');
          this.isVideoUploaded = false;
        }
      });
  }

  public showVideoDetails() {
    this.showVideoDetail = true;
  }

  public onBackClick() {
    this.showVideoDetail = false;
  }

  public addVideo() {
    this.videoDetail = {
      videoTitle: this.title,
      videoDesc: this.videoDesc,
      videoLink: this.videoPath,
      createdBy: this.teacherObj._id,
      subjectId: this.selectedSubject._id,
      classId: this.selectedClass._id,
      instituteId: this.selectedInstitute._id,
    };

    this._helper.addVideo(this.videoDetail)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((response: ResponsesTeacher.IVideoSubmissionResponse) => {
        if (response.success) {
          // this.status = true;
          // this.message = "Video added successfully.";
          // this.statusType = "success";
          this.getMyVideo();
          this.showVideoDetail = false;
          this.toastr.success('Video added successfully.');

        }
        else {
          // this.status = true;
          // this.message = "Unable to add video.";
          // this.statusType = "error";
          this.getMyVideo();
          this.toastr.error('Unable to add video.');
        }
      }, (err: Error) => {
        // this.status = true;
        // this.message = "Unable to add video.";
        // this.statusType = "error";
        this.toastr.error('Unable to add video.');
      });
  }

  //get teacher video
  public getMyVideo() {
    this._helper.getVideoByTeacher(this.teacherObj._id)
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((res: ResponsesTeacher.IMyVideoResponse) => {
        if (res) {
          this.videoList = res.data;
          console.log(this.videoList)
        }
        else {
          console.log(Error);
        }
      }, (err: Error) => {
        console.log(err, "Error");
      });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
