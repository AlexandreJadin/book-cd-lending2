import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit{

  mode: string;
  authForm: FormGroup;
  errorMessage: string;

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  constructor(public navParams: NavParams,
              public AuthService: AuthService,
              public menuCtrl: MenuController,
              public formBuilder: FormBuilder,
              public navCtrl: NavController) {
  }


  onToggleMenu() {
    this.menuCtrl.open();
  }

  initForm(){
    this.authForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmitForm(){
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if(this.mode === 'new'){
      this.AuthService.signUpUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage)
      }).catch(
        (error) => {
          this.errorMessage = error;
        }
      )
    }else if(this.mode === 'connect'){
      this.AuthService.signInUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage)
      }).catch(
        (error) => {
          this.errorMessage = error;
        }
      )
    }
  }

}
