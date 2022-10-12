import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/providers/api.provider';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userId: any;
  user: any;
  role: any;
  token: any;

  constructor(private api: ApiService, private router: Router,) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('user_id');

    if (!this.token) {
      this.router.navigate(['menu/inicial']);
    } else {
      this.role = sessionStorage.getItem('role')
    }
  }

}
