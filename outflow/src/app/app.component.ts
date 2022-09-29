import { Component } from '@angular/core';
import { filter } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeMenu!: "";

  
  constructor(
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    // this.router.navigate(['menu/inicial']);   
  }
}
