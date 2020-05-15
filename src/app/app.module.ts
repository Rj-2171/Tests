import { CountdownComponent, CountdownModule } from 'ngx-countdown';
import { GlobalModule } from './global-components/global.module';
import { UrlConstants } from './../const/const.url';
import { LoginSignupService } from './login-signup.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './apps/landing-page/landing-page.component';
import { LoginSignupComponent } from './apps/login-signup/login-signup.component';
import { NotAuthenticatedComponent } from './apps/not-authenticated/not-authenticated.component';
import { DashboardMenuComponent } from './apps/container-student/dashboard-menu/dashboard-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatChipsModule, MatDialog, MatMenuModule, MatTooltipModule } from '@angular/material';
import { TestComponent } from './apps/container-student/test/test.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
// import { TestListComponentGlobal } from './global-components/test-list/test-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginSignupComponent,
    NotAuthenticatedComponent,
    DashboardMenuComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    CountdownModule,
    MatChipsModule,
    PerfectScrollbarModule,
    GlobalModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center',
        closeButton: true,
        preventDuplicates: true
      }
    )
  ],
  providers: [LoginSignupService, UrlConstants, GlobalModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
