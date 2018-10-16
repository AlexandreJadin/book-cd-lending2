import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Media } from '../../models/Media';
import { MediaService } from '../../services/media.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {

  cd: Media;
  index: number;

  borrowerForm: FormGroup;

  constructor(public navParams: NavParams,
    public mediaService: MediaService,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index')
    this.cd = this.mediaService.cdList[this.index]
    this.initForm();
  }

  initForm(){
    this.borrowerForm = this.formBuilder.group({
      name : ['', Validators.required]
    })
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onBorrowCd(){
    this.cd.borrower = this.borrowerForm.get('name').value;
    this.cd.isLent = true;
    this.dismissModal();
  }
  onGiveBackCd(){
    this.cd.borrower = '';
    this.cd.isLent = false;
    this.dismissModal();
  }

}
