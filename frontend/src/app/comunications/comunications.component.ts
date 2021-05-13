import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../shared/services/utils.service";

@Component({
  selector: 'app-comunications',
  templateUrl: './comunications.component.html',
  styleUrls: ['./comunications.component.css']
})
export class ComunicationsComponent implements OnInit {

  myId: number;
  userId: number;

  constructor(private route: ActivatedRoute, private utilsService: UtilsService) {
    this.userId = this.route.snapshot.params.id;
    this.myId = Number(this.utilsService.getId());
  }

  ngOnInit(): void {
  }

}
