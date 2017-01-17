import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { DiseaseDetailPage } from '../disease-detail/disease-detail';
/*services*/
import { AuthService } from '../../providers/auth-service';
import { LoaderService } from '../../providers/loader-service';
import { DiseaseService } from '../../providers/disease-service';


/*
  Generated class for the DiseasesList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
    selector: 'page-diseases-list',
    templateUrl: 'diseases-list.html'
})
export class DiseasesListPage {
    searchTerm: string = '';
    errorMessage: string;
    HealthTopics: any;
    searchControl = new FormControl();
    isDataLoaded: boolean = false;
    constructor(private nav: NavController, private diseaseService: DiseaseService, private authService: AuthService, private loaderService: LoaderService) { }

    ionViewDidLoad() {
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
            this.loaderService.showLoading();
            if (this.searchTerm) {
                this.diseaseService.getHealthTopics(this.searchTerm)
                    .subscribe(
                    (result: any) => {
                        this.loaderService.hideLoading();
                        this.isDataLoaded = true;
                        this.HealthTopics = result;
                    },
                    error => {
                        this.errorMessage = <any>error
                        this.loaderService.hideLoading();
                    });
            }
            else {
                this.loaderService.hideLoading();
                this.isDataLoaded = false;
                this.HealthTopics = [];
            }
        });
    }
   
    getHealthTopicDetail(id) {
        this.nav.push(DiseaseDetailPage, {
            id: id
        });
    }
    
}
