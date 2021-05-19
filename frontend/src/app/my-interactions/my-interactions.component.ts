import { Component, OnInit } from '@angular/core';
import {AddService} from "../shared/services/add.service";
import {AddCreation} from "../shared/models/addCreation";
import {UtilsService} from "../shared/services/utils.service";
import {PetService} from "../shared/services/pet.service";
import {Pet} from "../shared/models/pet";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAddDialogComponent} from "./delete-add-dialog.component";
import {Router} from "@angular/router";
import {Comunication} from "../shared/models/comunication";
import {ComunicationService} from "../shared/services/comunication.service";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";

@Component({
  selector: 'app-my-interactions',
  templateUrl: './my-interactions.component.html',
  styleUrls: ['./my-interactions.component.css']
})
export class MyInteractionsComponent implements OnInit {

  myAdds: AddCreation[] = [];
  myComunications: Comunication[] = [];
  id: string;
  petName: string = '';
  petId: number;
  volunteerAddId: number;
  petAddId: number;
  loaded: boolean = false;

  constructor(private addService: AddService, private utilsService: UtilsService, private petService: PetService,
              public dialog: MatDialog, public router: Router, private comunicationService: ComunicationService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.utilsService.getId();
    this.getMyAdds();
    this.getMyComunications();
    setTimeout(() => { this.loaded = true }, 500);
  }

  getMyAdds(): void {
    this.addService.findByUserId(this.id).subscribe(
      (response: AddCreation[]) => {
        this.myAdds = response;
        if(this.addIsPet()){
          this.petService.findById(this.petId.toString()).subscribe(
            (response: Pet) => this.petName = response.name);
        }
      }
    );
  }

  getMyComunications(): void {
    this.comunicationService.findByUserId(this.id).subscribe(
      (response: Comunication[]) => {
        this.myComunications = response;
        for (const comunication of this.myComunications) {
          const messagesList = comunication.messages.split("||");
          comunication.lastMessage = messagesList[messagesList.length-2];
          let chatMateId;
          (comunication.userId1 === Number(this.id)) ? chatMateId = comunication.userId2 : chatMateId = comunication.userId1;
          this.userService.findById(chatMateId).subscribe(
            (user: User) => comunication.chatMate = user);
        }
      }
    );
  }

  addsIsEmpty(): boolean {
    return this.myAdds.length == 0;
  }

  addIsVolunteer(): boolean {
    for (const add of this.myAdds) {
      if(!add.petId){
        this.volunteerAddId = add.id;
        return true;
      }
    }
    return false;
  }

  addIsPet(): boolean {
    for (const add of this.myAdds) {
      if(add.petId){
        this.petAddId = add.id;
        this.petId = add.petId;
        return true;
      }
    }
    return false;
  }

  openDeleteVolunteerAddDialog(): void {
    this.dialog.open(DeleteAddDialogComponent, {
      data: this.volunteerAddId,
      width: '400px',
    }).afterClosed().subscribe(
      () => this.getMyAdds()
    );
  }

  openDeletePetAddDialog(): void {
    this.dialog.open(DeleteAddDialogComponent, {
      data: this.petAddId,
      width: '400px',
    }).afterClosed().subscribe(
      () => this.getMyAdds()
    );
  }

  openComunication(comunication: Comunication): void {
    this.router.navigate(['/home/comunications/', comunication.chatMate.id, comunication.type]);
  }

  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  comunicationsIsEmpty(): boolean {
    return this.myComunications.length === 0;
  }

  isNewMessage(comunication: Comunication): boolean {
    return comunication.notification === Number(this.id);
  }
}
