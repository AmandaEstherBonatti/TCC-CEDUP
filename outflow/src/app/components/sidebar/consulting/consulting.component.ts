import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/providers/api.provider';

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.scss']
})
export class ConsultingComponent implements OnInit {

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
