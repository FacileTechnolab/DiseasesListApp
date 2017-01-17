import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
/*components*/
import { ChangePasswordPage } from '../change-password/change-password';
/*constants*/
import { RegularExpr } from '../../constants/app.constants'
/*services*/
import { LoaderService } from '../../providers/loader-service';
import { StorageService } from '../../providers/storage-service';
import { AuthService } from '../../providers/auth-service';
import { ToastService } from '../../providers/toast-service';
/*validators*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'

})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  errorMessage: string;
  email: string;

  constructor(private nav: NavController, private formBuilder: FormBuilder, private loaderService: LoaderService, private storageService: StorageService,
    private authService: AuthService, private toastService: ToastService, private regularExpr: RegularExpr) {
    this.profileForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      userName: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.regularExpr.emailRegx)])]
    });
  }

  ngOnInit() {
    this.loaderService.showLoading();
    console.log(this.storageService.getCredentials());
    let currentUser = this.storageService.getCredentials();
    this.email = currentUser.username;
    this.getUserData(this.email);
  }

  editProfile() {
    this.errorMessage = null;
    this.loaderService.showLoading();
    console.log(this.profileForm.value);
    this.authService.editProfile(this.profileForm.value, this.email)
      .subscribe(
      result => {
        this.toastService.displayToast("Your profile updated successfully!");
      },
      error => {
        this.errorMessage = <any>error
        this.loaderService.hideLoading();
      },
      () => this.loaderService.hideLoading());
  }

  redirectToChangePasswordPage() {
    this.nav.push(ChangePasswordPage);
  }

  private getUserData(email) {
    this.authService.getUserDetail(email)
      .subscribe(
      result => {
        this.profileForm.controls['firstName'].setValue(result.firstName);
        this.profileForm.controls['lastName'].setValue(result.lastName);
        this.profileForm.controls['userName'].setValue(result.userName);
        this.profileForm.controls['email'].setValue(this.email);
      },
      error => {
        this.errorMessage = <any>error
        this.loaderService.hideLoading();
      },
      () => this.loaderService.hideLoading());
  }
}
