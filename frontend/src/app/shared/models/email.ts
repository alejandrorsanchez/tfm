export class Email {

  senderName: string;
  receiverName: string;
  receiverEmail: string;
  body: string

  constructor(senderName: string, receiverName: string, receiverEmail: string, body: string) {
    this.senderName = senderName;
    this.receiverName = receiverName;
    this.receiverEmail = receiverEmail;
    this.body = body;
  }
}
