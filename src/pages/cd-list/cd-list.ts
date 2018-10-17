import { Component } from '@angular/core';
import { ModalController, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/Media';
import { LendCdPage } from '../lend-cd/lend-cd';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Media[];
  cdListSubscription: Subscription;

  constructor(
    public mediaService: MediaService,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, { index: index })
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }
  ngOnInit() {
    this.cdListSubscription = this.mediaService.cdList$.subscribe(
      (cdList: Media[]) => {
        this.cdList = cdList.slice();
      }
    );
    this.mediaService.fetchLists();
  }

  ngOnDestroy() {
    this.cdListSubscription.unsubscribe();
  }

}
