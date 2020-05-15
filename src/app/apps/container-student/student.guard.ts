import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { LoginSignupService } from '../../login-signup.service';

@Injectable({
    providedIn: 'root'
})
export class StudentGuard implements CanActivate, CanLoad {

    constructor(private authService: LoginSignupService, private router: Router) { }

    canActivate() {
        return this.canLoad();
    }

    canLoad() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
        return this.authService.isLoggedIn();
    }
}