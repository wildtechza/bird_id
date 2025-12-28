export class Question {
  image: string;
  sound: string;
  answer!: string;

  constructor(data: Partial<Question>) {
    Object.assign(this, data);
  }
}