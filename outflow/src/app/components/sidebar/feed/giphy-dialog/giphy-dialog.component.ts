import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GiphyDialogService } from './giphy-dialog.service';


@Component({
  selector: 'app-giphy-dialog',
  templateUrl: './giphy-dialog.component.html',
  styleUrls: ['./giphy-dialog.component.css']
})
export class GiphyDialogComponent implements OnInit {

  searchTerm!: string;

  @HostListener('window:scroll')
  onScroll(){
    if((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
      this.giphyService.next();
    }
  }

  constructor(public giphyService: GiphyDialogService, public dialogGiphy: MatDialogRef<GiphyDialogComponent>) { }

  search(){
    this.giphyService.search(this.searchTerm);
    console.log("🚀 ~ file: giphy-dialog.component.ts ~ line 25 ~ GiphyDialogComponent ~ search ~ this.giphyService", this.giphyService)
    console.log("🚀 ~ file: giphy-dialog.component.ts ~ line 25 ~ GiphyDialogComponent ~ search ~ this.searchTerm", this.searchTerm)
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogGiphy.close();
  }

}
