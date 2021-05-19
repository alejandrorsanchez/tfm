export class Email {

  senderName: string;
  receiverName: string;
  receiverEmail: string;

  constructor(senderName: string, receiverName: string, receiverEmail: string) {
    this.senderName = senderName;
    this.receiverName = receiverName;
    this.receiverEmail = receiverEmail;
  }
}
