import { Component } from '@angular/core';
import { MenuController, LoadingController, ToastController } from 'ionic-angular';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public mediaService: MediaService) {

  }

  onToggleMenu() {
    this.menuCtrl.open();
  }


  onSaveList() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours'
    })
    loader.present()
    this.mediaService.saveData().then(
      () => {
        loader.dismiss()
        this.toastCtrl.create({
          message: 'Données sauvegardées',
          position: 'bottom',
          duration: 3000
        }).present();


      }
    ).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          position: 'bottom',
          duration: 3000
        }).present();
      }
    )
  }

  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours'
    })
    loader.present()
    this.mediaService.retrieveData().then(
      () => {
        loader.dismiss()
        this.toastCtrl.create({
          message: 'Données Récupérées',
          position: 'bottom',
          duration: 3000
        }).present();


      }
    ).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          position: 'bottom',
          duration: 3000
        }).present();
      }
    )
  }

}
