import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Media } from '../../models/Media';
import { MediaService } from '../../services/media.service';
/**
 * Generated class for the LendCdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {

  cd: Media;
  index: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaService: MediaService,
              public viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index')
    this.cd = this.mediaService.cdList[this.index]
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onToggleCd(){
    this.cd.isLent = !this.cd.isLent;
  }

}
