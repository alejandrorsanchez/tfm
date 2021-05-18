import {User} from "./user";

export class Comunication {
  id: number;
  userId1: number;
  userId2: number;
  messages: string;
  type: number;
  chatMate?: User;
  lastMessage?: string;
  notification?: number;

  constructor(userId1: number, userId2: number, type: number) {
    this.userId1 = userId1;
    this.userId2 = userId2;
    this.type = type;
    this.messages = '';
  }
}
