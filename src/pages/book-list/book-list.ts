import { Component } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/Media';
import { LendBookPage } from '../lend-book/lend-book';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  bookList: Media[]
  constructor(
    public mediaService: MediaService,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController) {
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, { index: index })
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  ionViewWillEnter() {
    this.bookList = this.mediaService.bookList.slice();

  }

}
