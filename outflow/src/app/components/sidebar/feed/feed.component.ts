import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImgSrcStyleBuilder } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { GiphyDialogComponent } from './giphy-dialog/giphy-dialog.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

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
    
    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar) { 
        
    }
    
    ngOnInit(): void {
        this.initForm();
    }
    
    initForm(){
        this.myFormGroup = this.formBuilder.group({
            public: ['', Validators.required]
        })
        this.message = ''
        sessionStorage.clear();
    }

    checkLink(){
        var pattern = /^https:\/\//i
        if(pattern.test(this.message)){
            this.link = true;
        }else{
            this.link = false;
        }
    }
    
    addPost(){
        const publication = this.feedInputRef.nativeElement.value;
        if(publication == ''){
            this._snackBar.open("Comente algo antes de publicar!", 'Fechar' ,{
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationInSeconds * 1000,
            });
        }else{
            this.publics.push(publication);
            this.checkLink();
            this.initForm();
        }
    }

    addEmoji(event: any){
        const {message} = this;
        const text = `${message}${event.emoji.native}`
        this.message = text;
    }

    toggleEmojiPicker(){
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    onFocus(){
        this.showEmojiPicker = false;
    }

    openDialog(){
        const dialogRef = this.dialog.open(GiphyDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            result = JSON.parse(sessionStorage.getItem('selectedGiphy')!);
            this.message = result;           
        })
    }

    likePost(i: any){
        this.like = !this.like
        let like = document.getElementById('mat-icon-like') as HTMLDialogElement
        if(this.like == false){
            like.style.color = 'black'
        }else{
            like.style.color = 'red';
        }
    }
}
