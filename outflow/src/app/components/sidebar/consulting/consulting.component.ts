import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pusher from 'pusher-js';

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

  title = 'teste-angular';
  username = 'username';
  message = '';
  messages: any[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if (!this.token) {
      this.router.navigate(['menu/inicial']);
    } else {
      this.role = sessionStorage.getItem('role')
    }
    Pusher.logToConsole = true;
    const pusher = new Pusher('c1153228710bff5d6c2e', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      return this.messages.push(data);
    });
  }

  submit(): void {
    this.http.post('http://localhost:3500/api/v1/chat/message', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }

}
