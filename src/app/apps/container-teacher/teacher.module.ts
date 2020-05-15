import { GlobalModule } from './../../global-components/global.module';
import { DashboardTeachComponent } from './dashboard-teach/dashboard-teach.component';
import { RouterModule } from '@angular/router';
import { UrlConstants } from './../../../const/const.url';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContainerTeacherComponent } from './container-teacher.component';
import { VideosTeacherComponent } from './videos-teacher/videos-teacher.component';
import { AnalysisTeacherComponent } from './analysis-teacher/analysis-teacher.component';
import { TestsTeacherComponent } from './tests-teacher/tests-teacher.component';
import { DiscussionsTeacherComponent } from './discussions-teacher/discussions-teacher.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatTabsModule, MatProgressBarModule, MatButtonModule,MatInputModule, MatFormFieldModule, MatExpansionModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
// import { TestListComponentGlobal } from 'src/app/global-components/test-list/test-list.component';


@NgModule({
    declarations: [
        ContainerTeacherComponent,
        VideosTeacherComponent,
        AnalysisTeacherComponent,
        TestsTeacherComponent,
        DashboardTeachComponent,
        DiscussionsTeacherComponent,

    ],
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatInputModule,
        MatTabsModule,
        MatExpansionModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        PerfectScrollbarModule,
        GlobalModule,
        RouterModule.forChild([
            {
                path: '',
                component: ContainerTeacherComponent,
                children: [
                    { path: '', component: AnalysisTeacherComponent },
                    { path: 'analysis', redirectTo: '' },
                    { path: 'tests', component: TestsTeacherComponent },
                    { path: 'discussions', component: DiscussionsTeacherComponent },
                    { path: 'videos', component: VideosTeacherComponent },
                ]
            },
        ])
    ],
    providers: [UrlConstants],
    bootstrap: []
})
export class TeacherModule { }
