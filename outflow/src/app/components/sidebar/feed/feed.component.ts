import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImgSrcStyleBuilder } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { GiphyDialogComponent } from './giphy-dialog/giphy-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FeedService, UserService } from 'src/providers/api.provider';
import { Router } from '@angular/router';


export interface Ifeed {
    Doctor: {
        id: string;
        name: string;
        lastName: string;
        photoDoctor: string;
        User: {
            id: string;
            photo: string;
        }
    };

    view: boolean;
    description: string;
    id: string;
    photoFeed: string;
    photoF: string;
}
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
    link!: boolean
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 2;
    like: boolean = false;
    feeds: Ifeed[] = [];
    stylesbol: boolean = false;

    file!: any;
    url: any;
    urlProfileUser: any;
    selectedFile: any;
    fileName!: string;
    createPhoto: any;
    post: any;
    userId: any;
    photoDoctor: any[] = [];
    photoFeed!: string;
    user: any;
    doctor: any;
    role: any;
    token: any;

    constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar,
        private httpClient: HttpClient, private userService: UserService, private feedService: FeedService) {

    }

    async ngOnInit(): Promise<void> {
        this.token = sessionStorage.getItem('token');
        this.role = sessionStorage.getItem('role');

        this.userId = sessionStorage.getItem('user_id');

        if (!this.token) {
            this.router.navigate(['menu/inicial']);
        } else {
            await this.getUser()

            this.role = this.user.role;
            if (this.user.photo != undefined) {
                this.urlProfileUser = `http://localhost:3500/api/v1/users/file/upload/${this.user.photo}`
            } else {
                this.urlProfileUser = '../../../../assets/cloud.jpg'
            }

            this.getFeeds()
        }
    }

    async showPhoto(fileName: string) {
        return this.photoFeed = `http://localhost:3500/api/v1/feeds/file/upload/${fileName}`
    }

    async getFeeds() {
        this.feeds = await this.feedService.findAll()
        for (let feed of this.feeds) {
            if (feed.Doctor.User.photo != null) {
                feed.Doctor.photoDoctor = `http://localhost:3500/api/v1/feeds/file/upload/${feed.Doctor.User.photo}`
            } else {
                feed.Doctor.photoDoctor = '../../../../assets/cloud.jpg'
            }
            if (feed.photoFeed != null) {
                feed.view = true
                feed.photoF = `http://localhost:3500/api/v1/feeds/file/upload/${feed.photoFeed}`
            }
        }
        console.log(this.feeds)
    }

    openProfile(profileId: string) {
        console.log(profileId)
        sessionStorage.setItem('other_profile', '0')
        sessionStorage.setItem('other_profile_id', profileId)
        this.router.navigate(['home/perfil']);
    }

    async getUser() {
        this.user = await this.userService.findOneUser(this.userId);
        if (this.user.Doctor) {

            this.doctor = this.user.Doctor
            this.initForm()
        }
        console.log(this.doctor)
    }

    initForm() {
        this.myFormGroup = this.formBuilder.group({
            description: ['', Validators.required],
            photoFeed: [this.fileName],
            Doctor: [this.doctor.id],
        })
        this.message = ''
    }

    // async getPost() {
    //     this.post = await this.feedService.findByUser(this.userId)
    //     console.log(this.post)
    //     this.url = `http://localhost:3500/api/v1/feeds/file/upload/${this.post.photo}`
    // }

    checkLink() {
        var pattern = /^https:\/\//i
        if (pattern.test(this.message)) {
            this.link = true;
        } else {
            this.link = false;
        }
    }

    async addPost() {
        const publication = this.feedInputRef.nativeElement.value;
        if (publication == '') {
            this._snackBar.open("Comente algo antes de publicar!", 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationInSeconds * 1000,
            });
        } else {
            let dataPost = this.myFormGroup.getRawValue();
            await this.feedService.createFeed(dataPost);
            this.initForm();
            this.url = ''
            this.stylesbol = false;
            this.getFeeds()


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

    removePhoto() {
        this.url = ''
        this.stylesbol = false
        this.fileName = ''
    }
    async fileChanged(event: any) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            this.httpClient
                .post('http://localhost:3500/api/v1/users/file/upload', formData)
                .subscribe(async resposta => {
                    if (resposta) {
                        this.file = resposta;
                        this.fileName = this.file.filename
                        this.createPhoto = {
                            photo: this.file.filename,
                            User: this.userId
                        }
                        this.myFormGroup.controls['photoFeed'].setValue(this.file.filename)
                        this.url = 'http://localhost:3500/api/v1/feeds/file/upload/' + this.file.filename;
                        this.stylesbol = true
                    }
                });

        } catch (e) {
            console.log(e);
        }
    }
}