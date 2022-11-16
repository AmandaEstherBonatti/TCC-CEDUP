import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  userId: any;
  user: any;
  role: any;
  token: any;

  constructor(private router: Router,
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if (!this.token) {
      this.router.navigate(['menu/inicial']);
    } else {
      this.role = sessionStorage.getItem('role')

    }
  }

}
