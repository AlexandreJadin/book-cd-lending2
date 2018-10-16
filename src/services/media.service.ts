import { Media } from "../models/Media";
import { Subject } from "rxjs/Subject";
import firebase from "firebase";
import DataSnapshot from 'firebase/database/'

export class MediaService {
  bookList: Media[] = [
    {
      name: 'Lord of the Ring',
      description: 'Killing Sauron n stuff',
      isBook: true,
      isLent: true,
      borrower: 'Gandalf the White'
    },
    {
      name: 'Harry Potter',
      description: 'Expelliarmus!',
      isBook: true,
      isLent: false,
      borrower: ''
    },
    {
      name: 'Alice in wonderland',
      description: 'We are all mad here',
      isBook: true,
      isLent: false,
      borrower: ''
    }
  ];

  cdList: Media[] = [
    {
      name: 'The Wall',
      description: 'Pink Floyd',
      isBook: true,
      isLent: false,
      borrower: ''
    },
    {
      name: 'The dark side of the moon',
      description: 'Pink floyd again',
      isBook: true,
      isLent: false,
      borrower: ''
    },
    {
      name: 'Back in black',
      description: 'AC/DC',
      isBook: true,
      isLent: false,
      borrower: ''
    }
  ];


  bookList$ = new Subject<Media[]>();
  cdList$ = new Subject<Media[]>();

  emitBooks() {
    this.bookList$.next(this.bookList.slice());
  }

  emitCds() {
    this.cdList$.next(this.cdList.slice());
  }

  saveData() {
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

  retrieveData() {
    //TODO call this at app start
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').once('value').then(
        (data: DataSnapshot) => {
          this.bookList = data.val();
          this.emitBooks();
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });

  //TODO store in device storage
  }
}
