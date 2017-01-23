import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class StorageService {

    constructor() {
    }

    setCredentials(username: string, token: string, refreshToken: string) {
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, refreshToken: refreshToken }));
    }

    getCredentials() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    clearCredentials() {
        localStorage.removeItem('currentUser');
    }

    updateTokenCredentials(token: string, refreshToken: string) {
        let user = this.getCredentials();
        let username = user && user.username;
        this.clearCredentials();
        this.setCredentials(username, token, refreshToken);
    }
    updateCredentials(email:string){
        let user = this.getCredentials();
        let token = user && user.token;
        let refreshToken = user && user.refreshToken;
        this.clearCredentials();
        this.setCredentials(email,token,refreshToken);
    }
    
}
