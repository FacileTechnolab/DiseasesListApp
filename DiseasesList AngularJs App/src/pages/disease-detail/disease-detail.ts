import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DiseaseService } from '../../providers/disease-service';
import { LoaderService } from '../../providers/loader-service';

/*
  Generated class for the DiseaseDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-disease-detail',
  templateUrl: 'disease-detail.html'
})
export class DiseaseDetailPage {
  healthTopic: any;
  errorMessage: string;
  constructor(private navParams: NavParams, private diseaseService: DiseaseService, private loaderService: LoaderService) {
    this.loaderService.showLoading();
    this.getHealthTopicDetail(navParams.get('id'));
  }

  getHealthTopicDetail(healthTopicId) {
    this.diseaseService.getHealthTopicById(healthTopicId)
      .subscribe(
      (result: any) => {
        this.healthTopic = result;
        this.loaderService.hideLoading();
      },
      error => {
        this.errorMessage = <any>error;
        this.loaderService.hideLoading();
      });
  }

}
  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad DiseaseDetailPage');
  //}


