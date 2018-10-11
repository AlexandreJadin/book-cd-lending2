import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, MenuController } from 'ionic-angular';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/Media';
import { LendCdPage } from '../lend-cd/lend-cd';

/**
 * Generated class for the CdListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Media[]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaService: MediaService,
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
