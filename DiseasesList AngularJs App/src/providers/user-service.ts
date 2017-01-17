import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  constructor(private storageService:StorageService) {
    
  }
  isUserLoggedIn(){
    let currentUser = this.storageService.getCredentials();
    console.log(currentUser);
    if(currentUser){
        return true;
    }
    else{
      return false;
    }
    
  }
  loggedOut(){
    this.storageService.clearCredentials();
  }
 
}
