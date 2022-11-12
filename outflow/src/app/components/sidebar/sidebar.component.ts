import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/providers/api.provider';
import { User } from 'src/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SidebarComponent implements OnInit {
  title = 'outflow';
  userId: any;
  user: any;
  token: any;
  role: any;
  url!: string;


  constructor(private api: UserService, private router: Router, private userService: User
  ) { }

  async ngOnInit() {
    this.token = sessionStorage.getItem('token');
    console.log(this.token);
    if (this.token) {
      this.userId = sessionStorage.getItem('user_id')
      await this.getUser(this.userId);
      sessionStorage.setItem('role', this.role)
    } else {
      // sessionStorage.clear();
      // this.router.navigate(['menu/inicial']);
    }

  }

  exit() {
    this.userService.logout()
  }

  async getUser(id: string) {
    this.user = await this.api.findOneUser(id)
    this.role = this.user.role
    return await this.user && this.role
  }

  openFeed() {
    sessionStorage.setItem('role', this.role)
    sessionStorage.setItem('user_id', this.user.id)
    this.router.navigate(['home/feed']);
  }

  openProfile() {
    sessionStorage.removeItem('other_profile')
    sessionStorage.removeItem('other_profile_id')

    this.router.navigate(['home/perfil']);

  }
}
