import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserService } from 'src/providers/api.provider';
import { GiphyDialogComponent } from './giphy-dialog/giphy-dialog.component';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
    @ViewChild("feedInput") feedInputRef!: ElementRef;
    myFormGroup!: FormGroup;
    publics: Array<string> = [];
    showEmojiPicker = false;
    message = ''
    sets = [
        'native',
        'google',
        'twitter',
        'facebook',
        'emojione',
        'apple',
        'messenger'
    ]
    set = 'twitter';
    inputText: string = ''


    longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`;

    userId: any;
    user: any;
    url: any;
    role: any;
    token: any;


    constructor(private router: Router, private userService: UserService,
        private formBuilder: FormBuilder, public dialog: MatDialog) {

    }

    async ngOnInit() {
        this.token = sessionStorage.getItem('token')!;
        this.userId = sessionStorage.getItem('user_id');

        if (!this.token) {
            this.router.navigate(['menu/inicial']);
        } else {
            this.role = sessionStorage.getItem('role')
            await this.getUser();
            this.url = `http://localhost:3500/api/v1/users/file/upload/${this.user.photo}`

        }
        this.initForm();
    }

    async getUser() {
        this.user = await this.userService.findOneUser(this.userId);

    }
    initForm() {
        this.myFormGroup = this.formBuilder.group({
            public: ['', Validators.required]
        })
    }

    addPost() {
        const publication = this.feedInputRef.nativeElement.value;
        this.publics.push(publication);
        this.initForm();
    }

    addEmoji(event: any) {
        const { message } = this;
        const text = `${message}${event.emoji.native}`
        this.message = text;
    }

    toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        console.log("🚀 ~ file: feed.component.ts ~ line 57 ~ FeedComponent ~ toggleEmojiPicker ~ this.showEmojiPicker", this.showEmojiPicker)
    }

    onFocus() {
        this.showEmojiPicker = false;
    }

    openDialog() {
        const dialogRef = this.dialog.open(GiphyDialogComponent);
    }
}
