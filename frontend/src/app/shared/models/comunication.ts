export class Comunication {
  id: number;
  userId1: number;
  userId2: number;
  messages?: string;

  constructor(userId1: number, userId2: number) {
    this.userId1 = userId1;
    this.userId2 = userId2;
    this.messages = '';
  }
}
