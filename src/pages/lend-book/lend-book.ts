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
  temporaryBook: Media;

  constructor(public navParams: NavParams,
              public mediaService: MediaService,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index')
    this.book = this.mediaService.bookList[this.index]
    this.temporaryBook = this.book
    // this.temporaryBook = Object.assign({},this.book);
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
    this.temporaryBook.borrower = this.borrowerForm.get('name').value;
    this.temporaryBook.isLent = true;
  }
  onGiveBackBook(){
    this.temporaryBook.borrower = '';
    this.temporaryBook.isLent = false;
  }

  onSave(){
    console.log(this.book)
    console.log(this.temporaryBook)
    // this.book=Object.assign({},this.temporaryBook);
    this.book = this.temporaryBook
    console.log(this.book)
    console.log(this.temporaryBook)
    //TODO save in local storage
    this.dismissModal();
  }

}
