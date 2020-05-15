import { TestComponent } from './apps/container-student/test/test.component';
import { TestListComponent } from './apps/container-student/test-list/test-list.component';
import { ContainerTeacherComponent } from './apps/container-teacher/container-teacher.component';
import { NotAuthenticatedComponent } from './apps/not-authenticated/not-authenticated.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { ContainerStudentComponent } from './apps/container-student/container-student.component';
import { LoginSignupComponent } from './apps/login-signup/login-signup.component';
import { LandingPageComponent } from './apps/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  // {path: 'fgug', component: DashboardComponent},
  { path: '', component: LandingPageComponent },
  { path: 'login/:id', component: LoginSignupComponent },
  {
    path: 'dashboard-student',
    loadChildren: () => import('./apps/container-student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'dashboard-teacher',
    loadChildren: () => import('./apps/container-teacher/teacher.module').then(m => m.TeacherModule),
    // component: ContainerStudentComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'test/:id/:d',
    component: TestComponent,
  },
  {
    path: '**', component: NotAuthenticatedComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
