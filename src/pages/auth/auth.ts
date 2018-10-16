import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit{

  mode: string
  authForm: FormGroup

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
  }

  constructor(public navParams: NavParams,
              public AuthService: AuthService,
              public menuCtrl: MenuController,
              public formBuilder: FormBuilder) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  onToggleMenu() {
    this.menuCtrl.open();
    this.initForm();
  }

  initForm(){
    this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmitForm(){

  }

}
