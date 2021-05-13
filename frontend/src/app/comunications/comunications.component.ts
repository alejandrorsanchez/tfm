import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../shared/services/utils.service";
import {ComunicationService} from "../shared/services/comunication.service";

@Component({
  selector: 'app-comunications',
  templateUrl: './comunications.component.html',
  styleUrls: ['./comunications.component.css']
})
export class ComunicationsComponent implements OnInit {

  myId: number;
  userId: number;
  myMessages: string[] = [];

  constructor(private route: ActivatedRoute, private utilsService: UtilsService, private comunicationService: ComunicationService) {
    this.userId = this.route.snapshot.params.id;
    this.myId = Number(this.utilsService.getId());
  }

  ngOnInit(): void {
    this.comunicationService.getComunication(this.myId, this.userId).subscribe(
      (response: string[]) => {
        this.myMessages = response;
      }
    );
  }

}
