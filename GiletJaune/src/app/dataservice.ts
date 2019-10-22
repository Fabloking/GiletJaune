import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';

interface Users {
    users: number
  }

@Injectable()
export class DataService {
    
    loggedIn: Subject<boolean>;
    users: Subject<Users | null>;

      doLogin(email: string, password: string) : Observable<any> {
        return this.http.post('http://localhost:3000/connexion', {
          email: email,
          password: password
        }, {
          withCredentials: true
        });
      }

      getLogin() {
        this.http.get('http://localhost:3000/connexion', {
          withCredentials: true
        }).subscribe((resp: any) => {
          this.loggedIn.next(resp.loggedIn);
          this.loggedIn.complete();
        }, (errorResp) => {
          this.toastr.error('Oops, something went wrong getting the logged in status')
        })
      }

      getAllUsers() {
        this.http.get('http://localhost:3000/getuser', {
          withCredentials: true
        }).subscribe((users: Users) => {
            this.users.next(users);
            this.users.complete();
          }, (errorResp) => {
            this.toastr.error('Oops, something went wrong getting the logged in status')
          })
      }

      logout() {
        return this.http.post('http://localhost:3000/deconnection', {}, {
          withCredentials: true
        });
      }

    constructor(
        private http: HttpClient,
        private toastr: ToastrService
        ){
            this.loggedIn = new Subject();
            this.getLogin();
        }
	
}