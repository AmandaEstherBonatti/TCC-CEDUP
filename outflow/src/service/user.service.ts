import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class User {
    private loggedChanged = new Subject<boolean>();
    public isLogged = false;
    constructor(private router: Router) { }

    auth(token: any): void {
        localStorage.setItem('token', token);
        this.loggedChanged.next(true);
        this.isLogged = true;
    }

    logout(): void {
        localStorage.clear();
        // localStorage.removeItem('token');
        // localStorage.removeItem('xsrfToken');
        this.loggedChanged.next(false);
        this.isLogged = false;
        this.router.navigate(['menu/inicial']);
    }

    isUserLoggedIn(): Subject<boolean> {
        return this.loggedChanged;
    }


}