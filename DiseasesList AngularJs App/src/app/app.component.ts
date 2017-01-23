import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { DiseasesListPage } from '../pages/diseases-list/diseases-list';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { UserService } from '../providers/user-service';
import { LoaderService } from '../providers/loader-service';

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;
    userName: string;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, private userService: UserService, private loaderService: LoaderService) {
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: DiseasesListPage },
            { title: 'About', component: AboutPage },
            { title: 'My Profile', component: ProfilePage }
        ];
        if (userService.isUserLoggedIn()) { //redirect user if user already logged in
            this.rootPage = DiseasesListPage;
        }
        else {
            this.rootPage = LoginPage;
        }
    }

    initializeApp() {
        this.loaderService.showLoading();
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            this.loaderService.hideLoading();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
    logout() {
        this.userService.loggedOut();
        this.nav.setRoot(LoginPage);
    }
}
