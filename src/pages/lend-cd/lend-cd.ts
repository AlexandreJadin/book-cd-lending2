import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Media } from '../../models/Media';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {

  cd: Media;
  index: number;
  constructor(public navParams: NavParams,
    public mediaService: MediaService,
    public viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index')
    this.cd = this.mediaService.cdList[this.index]
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleCd() {
    this.cd.isLent = !this.cd.isLent;
  }

}
