import { Media } from "../models/Media";


export class MediaService {
  bookList: Media[] = [
    {
      name: 'Lord of the Ring',
      description: 'Killing Sauron n stuff',
      isBook: true,
      isLent: true
    },
    {
      name: 'Harry Potter',
      description: 'Expeliermus',
      isBook: true,
      isLent: false
    },
    {
      name: 'Alice in wonderland',
      description: 'We are all mad here',
      isBook: true,
      isLent: false
    }
  ];

  cdList: Media[] = [
    {
      name: 'The Wall',
      description: 'Pink Floyd',
      isBook: true,
      isLent: false
    },
    {
      name: 'The dark side of the moon',
      description: 'Pink floyd again',
      isBook: true,
      isLent: false
    },
    {
      name: 'Back in black',
      description: 'AC/DC',
      isBook: true,
      isLent: false
    }
  ];
}
