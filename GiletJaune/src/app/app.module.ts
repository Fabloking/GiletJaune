import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateurComponent } from './Composants/utilisateur/utilisateur.component';
import { InscriptionComponent } from './Composants/inscription/inscription.component';
import { LoginComponent } from './Composants/login/login.component';
import { NavBarComponent } from './Composants/nav-bar/nav-bar.component';
import { TimeLineComponent } from './Composants/time-line/time-line.component';
import { RouterModule } from '@angular/router';
import { HomeComponentComponent } from './Composants/home-component/home-component.component';
import { DataService } from './dataservice';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurComponent,
    InscriptionComponent,
    LoginComponent,
    NavBarComponent,
    TimeLineComponent,
    HomeComponentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponentComponent},
      {path: 'inscription', component: InscriptionComponent},
      {path: 'connexion', component: LoginComponent}
    ])
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
