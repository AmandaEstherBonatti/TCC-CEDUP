import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import Pusher from 'pusher-js';
import { HistoricService, UserService } from "src/providers/api.provider";


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
    myFormGroup!: FormGroup;


    constructor(private http: HttpClient, private userService: UserService, private historicService: HistoricService, private formBuilder: FormBuilder) { }

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
        this.saveHistoric();
    }

    initForm() {

    }

    async saveHistoric() {
        if (this.doctor && this.otherClient) {
            this.myFormGroup = this.formBuilder.group({
                Client: [this.otherClient.id],
                Doctor: [this.doctor.id],
            })
            try {
                let historic = this.myFormGroup.getRawValue();
                const h = await this.historicService.create(historic)

            } catch (e) {
                console.log(e)
            }

        } else if (this.client && this.otherDoctor) {
            this.myFormGroup = this.formBuilder.group({
                Client: [this.client.id],
                Doctor: [this.otherDoctor.id],
            })
            try {
                let historic = this.myFormGroup.getRawValue();
                const h = await this.historicService.create(historic)

            } catch (e) {
                console.log(e)
            }
        }
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