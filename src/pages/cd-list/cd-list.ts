import { Component } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/Media';
import { LendCdPage } from '../lend-cd/lend-cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Media[]
  constructor(public mediaService: MediaService,
              public modalCtrl: ModalController,
              public menuCtrl: MenuController) {
  }

  onLoadCd(index: number){
    let modal = this.modalCtrl.create(LendCdPage, {index: index})
    modal.present();
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  ionViewWillEnter() {
    this.cdList = this.mediaService.cdList.slice();

  }

}
