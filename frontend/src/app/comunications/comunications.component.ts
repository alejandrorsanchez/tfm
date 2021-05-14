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

  myId: number;
  userId: number;
  messagesList: string[] = [];
  myComunication: Comunication;

  constructor(private route: ActivatedRoute, private utilsService: UtilsService, private comunicationService: ComunicationService) {
    this.userId = this.route.snapshot.params.id;
    this.myId = Number(this.utilsService.getId());
    this.myComunication = new Comunication(this.myId, this.userId);
  }

  ngOnInit(): void {
    this.getComunicationFromUsers(this.myId, this.userId);
  }

  getComunicationFromUsers(userId1: number, userId2: number) {
    this.comunicationService.findByUserId1AndUserId2(userId1, userId2).subscribe(
      (response: Comunication) => {
        if(response){
          this.myComunication = response;
          this.createIterableFromString(this.myComunication.messages);
        }else{
           this.myComunication = new Comunication(this.myId, this.userId);
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
        this.comunicationService.save(this.myComunication).subscribe(
          response => this.myComunication.id = response['id']
        );
      }else{
        this.comunicationService.update(this.myComunication).subscribe(
          response => {

          }
        );
      }
    }else{
      this.utilsService.showNotification('Escribe algo para poder ser enviado');
    }
  }

  isFirstMessage() {
    return this.messagesList.length === 1;
  }

  updateMessageList(message: string) {
    this.messagesList.push(message);
    this.myComunication.messages += message + '||';
  }
}
