import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../shared/services/utils.service";
import {ComunicationService} from "../shared/services/comunication.service";
import {Comunication} from "../shared/models/comunication";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import {DeleteComunicationDialogComponent} from "./delete-comunication-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EmailService} from "../shared/services/email.service";
import {Email} from "../shared/models/email";

@Component({
  selector: 'app-comunications',
  templateUrl: './comunications.component.html',
  styleUrls: ['./comunications.component.css']
})
export class ComunicationsComponent implements OnInit {

  type: number;
  myId: number;
  userId: number;
  messagesList: string[] = [];
  comunication: Comunication;
  chatMate: User = new User();
  myUser: User;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private utilsService: UtilsService, private comunicationService: ComunicationService,
              private userService: UserService, private router: Router, public dialog: MatDialog, private emailService: EmailService) {
    this.userId = this.route.snapshot.params.id;
    this.type = this.route.snapshot.params.type;
    this.myId = Number(this.utilsService.getId());
  }

  ngOnInit(): void {
    this.getUsersChat();
    this.getComunicationFromUsers(this.myId, this.userId, this.type);
    setTimeout(() => { this.loaded = true }, 300);
  }

  getUsersChat(): void {
    this.userService.findById(this.userId.toString()).subscribe(
      (user: User) => {
        this.chatMate = user;
        this.userService.findById(this.myId.toString()).subscribe(
          (user: User) => this.myUser = user);
      }
    );
  }

  getComunicationFromUsers(userId1: number, userId2: number, type: number): void {
    this.comunicationService.findByUserId1AndUserId2AndType(userId1, userId2, type).subscribe(
      (response: Comunication) => {
        if(response){
          this.comunication = response;
          this.checkNotificationsForMyUser();
          this.createIterableFromMessagesAndBeauty(this.comunication.messages);
        }else{
          this.comunication = new Comunication(this.myId, this.userId, this.type);
          this.messagesList = [];
        }
      }
    );
  }

  checkNotificationsForMyUser(): void {
    if(this.comunication.notification === this.myId){
      this.comunication.notification = null
      this.comunicationService.update(this.comunication).subscribe(() => {});
    }
  }

  createIterableFromMessagesAndBeauty(messages: string): void {
    this.messagesList = messages.split("||");
    this.messagesList.pop();
  }

  sendMessage(): void {
    const inputText = document.getElementById('inputText') as HTMLInputElement;
    if(inputText.value){
      this.updateMessageList(inputText.value);
      inputText.value = '';
      this.comunication.notification = this.userId;
      if(this.isFirstMessage()){
        this.comunicationService.save(this.comunication).subscribe(
          response => this.comunication.id = response['id']);
      }else{
        this.comunicationService.update(this.comunication).subscribe(() => {});
      }
      this.sendEmailNotification(this.myUser, this.chatMate);
    }else{
      this.utilsService.showNotification('Escribe algo para poder ser enviado');
    }
  }

  updateMessageList(message: string): void {
    this.messagesList.push(this.myUser.username + ': ' + message);
    this.comunication.messages += this.myUser.username + ': ' + message + '||';
  }

  sendEmailNotification(sender: User, receiver: User): void {
    const email = new Email(sender.username, receiver.username, receiver.email);
    this.emailService.sendMessage(email).subscribe(
      response => this.utilsService.showNotification(response['message']));
  }

  openDeleteComunicationDialog(): void {
    this.dialog.open(DeleteComunicationDialogComponent, {
      data: this.comunication.id,
      width: '400px',
    });
  }

  isFirstMessage(): boolean {
    return this.messagesList.length === 1;
  }

  isNewComunication(): boolean {
    return this.messagesList.length === 0
  }

  isMyMessage(message: string): boolean {
    return message.split(':')[0] === this.myUser.username;
  }

  redirectToMyInteractions(): void {
    this.router.navigateByUrl('/home/interactions');
  }
}
