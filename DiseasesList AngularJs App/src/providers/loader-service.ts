import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoaderService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoaderService {
  loading: Loading;
  constructor(private loadingController: LoadingController) {
  }
  showLoading() {
    this.loading = this.loadingController.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

}
