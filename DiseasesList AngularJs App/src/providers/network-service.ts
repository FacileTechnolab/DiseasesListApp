import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Network, Diagnostic } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the NetworkService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkService {

  constructor(private alert: AlertController) {
    console.log('Hello NetworkService Provider');
  }
  noConnection() {
    return(Network.type === 'none');
  }
  private showSettings() {
    if (Diagnostic.switchToWifiSettings) {
      Diagnostic.switchToWifiSettings();
    } else {
      Diagnostic.switchToSettings();
    }
  }

  showNetworkAlert() {
    let networkAlert = this.alert.create({
      title: 'No Internet Connection',
      message: 'Please check your internet connection.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Open Settings',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.showSettings();
            })
          }
        }
      ]
    });
    networkAlert.present();
  }
}
