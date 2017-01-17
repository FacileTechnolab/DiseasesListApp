import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { DiseasesListPage } from '../diseases-list/diseases-list';
/*services */
import { AuthService } from '../../providers/auth-service';
import { StorageService } from '../../providers/storage-service';
import { LoaderService } from '../../providers/loader-service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    user: any = { username: 'admin@gmail.com', password: 'admin@123' };
    errorMessage: string;
    constructor(private nav: NavController, private menu: MenuController, private authService: AuthService, private storageService: StorageService, private loaderService: LoaderService) {
        //disable swipe menu on login page
        this.menu.swipeEnable(false);
    }

    //redirect to register page
    redirectToSignupPage() {
        this.nav.push(RegisterPage);
    }

    login() {
        this.loaderService.showLoading();
        this.authService.login(this.user)
            .subscribe(
            result => {
                //store token locally
                this.storageService.setCredentials(this.user.username, result.access_token, result.refresh_token);
                console.log(this.storageService.getCredentials());
                this.nav.setRoot(DiseasesListPage);
                
            },
            error => {
                this.errorMessage = <any>error;
                this.loaderService.hideLoading();
            },
            () => this.loaderService.hideLoading());
    }
}
