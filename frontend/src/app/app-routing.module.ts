import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./shared/security/auth-guard.service";
import {CoverComponent} from "./cover/cover.component";
import {OperationsComponent} from "./operations/operations.component";
import {ProfileComponent} from "./profile/profile.component";
import {PublisherComponent} from "./publisher/publisher.component";
import {AddsComponent} from "./adds/adds.component";
import {MyInteractionsComponent} from "./my-interactions/my-interactions.component";
import {ComunicationsComponent} from "./comunications/comunications.component";

const routes: Routes = [
  {path: '', component: CoverComponent},
  {path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component: OperationsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'publish', component: PublisherComponent},
      {path: 'interactions', component: MyInteractionsComponent},
      {path: 'adds/:type', component: AddsComponent},
      {path: 'comunications/:id/:type', component: ComunicationsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
