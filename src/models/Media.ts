export class Media{
  description: string;
  isLent: boolean

  constructor(public name: string, public isBook: boolean){
    this.isLent = false;
  }

}
