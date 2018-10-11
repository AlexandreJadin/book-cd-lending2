import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Media } from '../../models/Media';
import { MediaService } from '../../services/media.service';

/**
 * Generated class for the LendBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit{
  book: Media;
  index: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
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
