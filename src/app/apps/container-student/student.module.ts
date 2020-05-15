import { GlobalModule } from './../../global-components/global.module';
// import { TestListComponentGlobal } from './../../global-components/test-list/test-list.component';
import { ContainerStudentComponent } from './container-student.component';
import { TestListComponent } from './test-list/test-list.component';
import { DashboardStuComponent } from './dashboard-stu/dashboard-stu.component';
import { RouterModule } from '@angular/router';
import { UrlConstants } from './../../../const/const.url';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { DiscussionComponent } from './discussion/discussion.component';
// import { VideoStudentComponent } from './video-student/video.component';
// import { VideosStudentComponent } from './videos-student/videos.component';
import { MatButtonModule, MatExpansionModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatDialog, MatMenuModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { CountdownModule } from 'ngx-countdown';
import { VideoStudentComponent } from './video-student/video-student.component';



@NgModule({
    declarations: [
        DashboardStuComponent,
        ContainerStudentComponent,
        // TestComponent,
        DiscussionComponent,
        VideoStudentComponent,
        TestListComponent,
        VideoStudentComponent
    ],
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatExpansionModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        CountdownModule,
        GlobalModule,
        RouterModule.forChild([
            {
                path: '',
                component: ContainerStudentComponent,
                children: [
                    { path: '', component: TestListComponent },
                    { path: 'my-tests', redirectTo: '' },
                    { path: 'discussion', component: DiscussionComponent },
                    { path: 'videos', component: VideoStudentComponent },
                    // {
                    //     path: 'test/:id',
                    //     component: TestComponent
                    // }
                ]
            },

        ])
    ],
    providers: [UrlConstants],
    bootstrap: [],
    exports: []

})
export class StudentModule { }
