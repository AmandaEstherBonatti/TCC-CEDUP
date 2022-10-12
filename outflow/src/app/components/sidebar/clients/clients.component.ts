import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/providers/api.provider';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  userId: any;
  user: any;
  role: any;
  token: any;

  constructor(private api: ApiService, private router: Router,) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if (!this.token) {
      this.router.navigate(['menu/inicial']);
    } else {
      this.role = sessionStorage.getItem('role')

    }
  }

}
