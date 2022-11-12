import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import Pusher from 'pusher-js';
import { UserService } from "src/providers/api.provider";


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    title = 'teste-angular';
    usernameOther = 'username';
    message = '';
    messages: any[] = [];

    otherProfileId: any;
    otherUser: any;
    otherDoctor: any;
    otherClient: any;
    userId: any;
    user: any;
    client: any;
    doctor: any;

    constructor(private http: HttpClient, private userService: UserService) { }

    async ngOnInit() {

        this.userId = sessionStorage.getItem('user_id');
        this.otherProfileId = sessionStorage.getItem('other_profile_id');


        await this.getUser(this.userId, this.otherProfileId)

        if (this.user.Doctor) {
            this.doctor = this.user.Doctor
        } else {
            this.client = this.user.Client
        }
        if (this.otherUser.Doctor) {
            this.otherDoctor = this.otherUser.Doctor
            this.usernameOther = `${this.otherDoctor.name} ${this.otherDoctor.lastName}`
        } else {
            this.otherClient = this.otherUser.Client
            this.usernameOther = `${this.otherClient.name} ${this.otherClient.lastName}`
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

    async getUser(userId: string, otherUserId: any) {
        this.user = await this.userService.findOneUser(userId);
        this.otherUser = await this.userService.findOneUser(otherUserId);
    }

    onChange(value: string) {
        this.message = value;
    }
    submit(): void {
        if (this.user.Doctor) {
            console.log(this.message)
            this.http.post('http://localhost:3500/api/v1/chat/message', {
                username: `${this.doctor.name} ${this.doctor.lastName}`,
                message: this.message
            }).subscribe(() => this.message = '');
        } else {
            this.http.post('http://localhost:3500/api/v1/chat/message', {
                username: `${this.client.name} ${this.client.lastName}`,
                message: this.message
            }).subscribe(() => this.message = '');
        }
    }
}