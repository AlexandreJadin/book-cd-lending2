import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private menuCtrl: MenuController) {

  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

}
