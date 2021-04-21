import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingUpDialogComponent } from './user/sing-up-dialog.component';
import { LogInDialogComponent } from './user/log-in-dialog.component';
import { DeleteAccountDialogComponent } from './user/delete-account-dialog.component';
import { DeletePetDialogComponent } from './pet/delete-pet-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {InterceptorService} from "./shared/interceptor.service";
import { HomeComponent } from './home/home.component';
import { CoverComponent } from './cover/cover.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { OperationsComponent } from './operations/operations.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProfileComponent } from './profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { UpdatePetDialogComponent } from './pet/update-pet-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SingUpDialogComponent,
    LogInDialogComponent,
    HomeComponent,
    CoverComponent,
    OperationsComponent,
    ProfileComponent,
    DeleteAccountDialogComponent,
    DeletePetDialogComponent,
    UpdatePetDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
