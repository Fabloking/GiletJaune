import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateurComponent } from './Composants/utilisateur/utilisateur.component';
import { InscriptionComponent } from './Composants/inscription/inscription.component';
import { LoginComponent } from './Composants/login/login.component';
import { NavBarComponent } from './Composants/nav-bar/nav-bar.component';
import { TimeLineComponent } from './Composants/time-line/time-line.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurComponent,
    InscriptionComponent,
    LoginComponent,
    NavBarComponent,
    TimeLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
