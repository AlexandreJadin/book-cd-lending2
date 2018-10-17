import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/Media';
import { LendBookPage } from '../lend-book/lend-book';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy {

  bookList: Media[]
  bookListSubscription: Subscription;

  constructor(
    public mediaService: MediaService,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, { index: index })
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }
  ngOnInit() {
    this.bookListSubscription = this.mediaService.bookList$.subscribe(
      (bookList: Media[]) => {
        this.bookList = bookList.slice();
      }
    );
    this.mediaService.fetchLists();
  }

  ngOnDestroy() {
    this.bookListSubscription.unsubscribe();
  }



}
