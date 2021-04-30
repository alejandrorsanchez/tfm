import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AddListing} from "../shared/addListing";
import {AddService} from "../shared/add.service";
import {UtilsService} from "../shared/utils.service";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  type: number;
  adds: AddListing[];
  id: string;

  constructor(private route: ActivatedRoute, private addService: AddService, private utilsService: UtilsService) {
    this.type = this.route.snapshot.params.type;
  }

  ngOnInit(): void {
    this.id = this.utilsService.getId();
    this.addService.findByType(this.type, this.id).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  isAdoption() {
    return this.type == 1;
  }
}
