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
  temporaryCd: Media;

  constructor(public navParams: NavParams,
              public mediaService: MediaService,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index')
    this.cd = this.mediaService.cdList[this.index]
    this.temporaryCd = this.cd
    this.initForm();
  }

  initForm(){
    this.borrowerForm = this.formBuilder.group({
      name : ['', Validators.required]
    })
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onBorrowCd(){
    this.temporaryCd.borrower = this.borrowerForm.get('name').value;
    this.temporaryCd.isLent = true;
  }
  onGiveBackCd(){
    this.temporaryCd.borrower = '';
    this.temporaryCd.isLent = false;
  }

  onSave(){
    console.log(this.cd)
    console.log(this.temporaryCd)
    this.cd=Object.assign({},this.temporaryCd);
    console.log(this.cd)
    console.log(this.temporaryCd)
    this.mediaService.saveLists()
    //TODO save in local storage
    this.dismissModal();
  }

  onClose(){
    this.mediaService.fetchLists();
    //TODO save in local storage
    this.dismissModal();
  }

}
