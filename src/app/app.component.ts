import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';

import * as firebase from 'firebase';
import { AuthPage } from '../pages/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  settingsPage: any = SettingsPage;
  authPage: any = AuthPage;

  @ViewChild('content') content: NavController;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController) {
    platform.ready().then(() => {

      // Initialize Firebase
      let config = {
        apiKey: "AIzaSyDChLSXYBgesb8pSzt-85_ZG-GC6CoIAB4",
        authDomain: "book-cd-lending2.firebaseapp.com",
        databaseURL: "https://book-cd-lending2.firebaseio.com",
        projectId: "book-cd-lending2",
        storageBucket: "book-cd-lending2.appspot.com",
        messagingSenderId: "344386056557"
      };
      firebase.initializeApp(config);


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }
}

