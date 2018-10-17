import { Media } from "../models/Media";
import { Subject } from "rxjs/Subject";
import firebase from "firebase";
import DataSnapshot from 'firebase/database/'
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage'

@Injectable()
export class MediaService {
  // bookList: Media[] = [
  //   {
  //     name: 'Lord of the Ring',
  //     description: 'Killing Sauron n stuff',
  //     isBook: true,
  //     isLent: true,
  //     borrower: 'Gandalf the White'
  //   },
  //   {
  //     name: 'Harry Potter',
  //     description: 'Expelliarmus!',
  //     isBook: true,
  //     isLent: false,
  //     borrower: ''
  //   },
  //   {
  //     name: 'Alice in wonderland',
  //     description: 'We are all mad here',
  //     isBook: true,
  //     isLent: false,
  //     borrower: ''
  //   }
  // ];

  // cdList: Media[] = [
  //   {
  //     name: 'The Wall',
  //     description: 'Pink Floyd',
  //     isBook: true,
  //     isLent: false,
  //     borrower: ''
  //   },
  //   {
  //     name: 'The dark side of the moon',
  //     description: 'Pink floyd again',
  //     isBook: true,
  //     isLent: false,
  //     borrower: ''
  //   },
  //   {
  //     name: 'Back in black',
  //     description: 'AC/DC',
  //     isBook: true,
  //     isLent: false,
  //     borrower: ''
  //   }
  // ];

  bookList: Media[] = [];
  cdList: Media[] = [];
  bookList$ = new Subject<Media[]>();
  cdList$ = new Subject<Media[]>();
  constructor(public storage: Storage){

  }

  emitBooks() {
    this.bookList$.next(this.bookList.slice());
  }

  emitCds() {
    this.cdList$.next(this.cdList.slice());
  }

  /**
   * Save both lists towards the backend DB
   */
  saveData() {
    console.log('saveData')
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').set(this.bookList).then(
        (data: DataSnapshot) => {
          resolve(data);
        }
      ).then(// TODO correct promise chaining
        () => {
          firebase.database().ref('cds').set(this.cdList).then(
            (data: DataSnapshot) => {
              resolve(data);
            }
          )
        }
      ).catch(
        (error) => {
          reject(error);
        }
      )
    });
  }

  /**
   * Retrieve both lists from the backend DB
   */
  retrieveData() {
    console.log('retrieveData')
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').once('value').then(
        (data: DataSnapshot) => {
          this.bookList = data.val();
          this.emitBooks();
          resolve('Livres récupérées avec succès !');
        }).then(// TODO correct promise chaining
          () => {
            firebase.database().ref('cds').once('value').then(
          (data: DataSnapshot) => {
            this.cdList = data.val();
            this.emitCds();
            resolve('Cds récupérées avec succès !');
            this.saveLists();
          }
            )
        }
        ).catch((error) => {
          reject(error);
        }
        );
    });
    //TODO store in device storage
  }

  /**
   * Save both lists to local storage
   */
  saveLists() {
    console.log('saveLists')
    console.log(this.bookList)
    console.log(this.cdList)
    this.storage.set('books', this.bookList);
    this.storage.set('cds', this.cdList);
    this.emitBooks();
    this.emitCds();
  }

  /**
   * Fetch both lists from local storage
   */
  fetchLists() {
    console.log('fetchLists')
    this.storage.get('books').then(
      (list) => {
        if (list && list.length) {
          this.bookList = list.slice();
        }
        this.emitBooks();
      }
    ).then( // TODO correct Promise chaining
      () => {
        this.storage.get('cds').then(
          (list) => {
            if (list && list.length) {
              this.cdList = list.slice();
            }
            this.emitCds();
          }
        )
      }
    );
  }

}
