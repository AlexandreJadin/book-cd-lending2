export class Media{
  description: string;
  isLent: boolean;
  borrower: string;

  constructor(public name: string, public isBook: boolean){
    this.isLent = false;
    this.borrower = '';
  }

}
