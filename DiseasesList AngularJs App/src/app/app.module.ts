import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DiseasesListPage } from '../pages/diseases-list/diseases-list';
import { AboutPage } from '../pages/about/about'
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { DiseaseDetailPage } from '../pages/disease-detail/disease-detail';
/*services*/
import { DiseaseService } from '../providers/disease-service';
import { AuthService } from '../providers/auth-service';
import { StorageService } from '../providers/storage-service';
import { LoaderService } from '../providers/loader-service';
import { NetworkService } from '../providers/network-service';
import { HttpService } from '../providers/http-service';
import { UserService } from '../providers/user-service';
import { ToastService } from '../providers/toast-service';
/*constants*/
import { APIConfiguration } from '../constants/app.constants';
import { RegularExpr } from '../constants/app.constants';
import { OAuthClient } from '../constants/app.constants';
/*validators */
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        RegisterPage,
        AboutPage,
        ProfilePage,
        ChangePasswordPage,
        DiseasesListPage,
        DiseaseDetailPage
    ],
    imports: [
        IonicModule.forRoot(MyApp), ReactiveFormsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        RegisterPage,
        AboutPage,
        ProfilePage,
        ChangePasswordPage,
        DiseasesListPage,
        DiseaseDetailPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DiseaseService, AuthService, StorageService, LoaderService,
        APIConfiguration, RegularExpr,OAuthClient, NetworkService, HttpService, UserService, ToastService]

})
export class AppModule { }
