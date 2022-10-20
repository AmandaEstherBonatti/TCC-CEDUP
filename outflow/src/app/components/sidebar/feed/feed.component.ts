import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImgSrcStyleBuilder } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserService } from 'src/providers/api.provider';
import { GiphyDialogComponent } from './giphy-dialog/giphy-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
    set = 'apple';
    inputText: string = ''

    longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`;

    userId: any;
    user: any;
    url: any;
    role: any;
    token: any;

    link!: boolean
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 2;
    like: boolean = false;


    constructor(private _snackBar: MatSnackBar, private router: Router, private userService: UserService,
        private formBuilder: FormBuilder, public dialog: MatDialog) { }

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
        this.message = ''
        sessionStorage.clear();
    }

    checkLink() {
        var pattern = /^https:\/\//i
        if (pattern.test(this.message)) {
            this.link = true;
        } else {
            this.link = false;
        }
    }

    addPost() {
        const publication = this.feedInputRef.nativeElement.value;
        if (publication == '') {
            this._snackBar.open("Comente algo antes de publicar!", 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationInSeconds * 1000,
            });
        } else {
            this.publics.push(publication);
            this.checkLink();
            this.initForm();
        }
    }

    addEmoji(event: any) {
        const { message } = this;
        const text = `${message}${event.emoji.native}`
        this.message = text;
    }

    toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    onFocus() {
        this.showEmojiPicker = false;
    }

    openDialog() {
        const dialogRef = this.dialog.open(GiphyDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            result = JSON.parse(sessionStorage.getItem('selectedGiphy')!);
            this.message = result;
        })
    }

    likePost(i: any) {
        this.like = !this.like
        let like = document.getElementById('mat-icon-like') as HTMLDialogElement
        if (this.like == false) {
            like.style.color = 'black'
        } else {
            like.style.color = 'red';
        }
    }
}
