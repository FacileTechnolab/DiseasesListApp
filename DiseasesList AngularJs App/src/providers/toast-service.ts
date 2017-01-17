import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the ToastService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ToastService {

  constructor(private toastCtrl:ToastController) {
  }
 
 displayToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position : 'top'
    });
    toast.present();
 }
}
