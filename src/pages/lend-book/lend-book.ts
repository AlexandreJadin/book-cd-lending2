import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Media } from '../../models/Media';
import { MediaService } from '../../services/media.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit{
  book: Media;
  index: number;
  borrowerForm: FormGroup;

  constructor(public navParams: NavParams,
              public mediaService: MediaService,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index')
    this.book = this.mediaService.bookList[this.index]
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

  onBorrowBook(){
    this.book.borrower = this.borrowerForm.get('name').value;
    this.book.isLent = true;
  }
  onGiveBackBook(){
    this.book.borrower = '';
    this.book.isLent = false;
  }

  onSave(){

  }

}
