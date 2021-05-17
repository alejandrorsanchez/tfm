import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../shared/services/utils.service";
import {ComunicationService} from "../shared/services/comunication.service";
import {Comunication} from "../shared/models/comunication";

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

  constructor(private route: ActivatedRoute, private utilsService: UtilsService, private comunicationService: ComunicationService) {
    this.userId = this.route.snapshot.params.id;
    this.type = this.route.snapshot.params.type;
    this.myId = Number(this.utilsService.getId());
  }

  ngOnInit(): void {
    this.getComunicationFromUsers(this.myId, this.userId, this.type);
  }

  getComunicationFromUsers(userId1: number, userId2: number, type: number) {
    this.comunicationService.findByUserId1AndUserId2AndType(userId1, userId2, type).subscribe(
      (response: Comunication) => {
        if(response){
          this.comunication = response;
          this.createIterableFromString(this.comunication.messages);
        }else{
          this.comunication = new Comunication(this.myId, this.userId, this.type);
          this.messagesList = [];
        }
      }
    );
  }

  createIterableFromString(messages: string) {
    this.messagesList = messages.split("||");
  }

  sendMessage() {
    const inputText = document.getElementById('inputText') as HTMLInputElement;
    if(inputText.value){
      this.updateMessageList(inputText.value);
      inputText.value = '';
      if(this.isFirstMessage()){
        this.comunicationService.save(this.comunication).subscribe(
          response => this.comunication.id = response['id']
        );
      }else{
        this.comunicationService.update(this.comunication).subscribe(
          response => {

          }
        );
      }
    }else{
      this.utilsService.showNotification('Escribe algo para poder ser enviado');
    }
  }

  updateMessageList(message: string) {
    this.messagesList.push(message);
    this.comunication.messages += message + '||';
  }

  isFirstMessage(): boolean {
    return this.messagesList.length === 1;
  }
}
