import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Media } from '../../models/Media';
import { MediaService } from '../../services/media.service';


@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit{
  book: Media;
  index: number;
  constructor(public navParams: NavParams,
              public mediaService: MediaService,
              public viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index')
    this.book = this.mediaService.bookList[this.index]
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onToggleBook(){
    this.book.isLent = !this.book.isLent;
  }

}
