import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/providers/api.provider';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  title = 'outflow';
  userId: any;
  user: any;
  token: any;
  role: any;

  constructor(private api: UserService, private router: Router,
  ) { }

  async ngOnInit() {
    this.token = sessionStorage.getItem('token');
    console.log(this.token);
    if (this.token) {
      this.userId = sessionStorage.getItem('user_id')
      await this.getUser(this.userId);
      sessionStorage.setItem('role', this.role)
    } else {
      sessionStorage.clear();
      this.router.navigate(['menu/inicial']);
    }
  }

  exit() {
    sessionStorage.clear();
    this.router.navigate(['menu/inicial']);
  }

  async getUser(id: string) {
    this.user = await this.api.findOneUser(id)
    this.role = this.user.role
    return await this.user && this.role

  }
}
