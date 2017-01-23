import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*services*/
import { AuthService } from '../../providers/auth-service';
import { StorageService } from '../../providers/storage-service';
import { LoaderService } from '../../providers/loader-service';
import { ToastService } from '../../providers/toast-service';
/*validations*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  changePasswordForm: FormGroup;
  changePasswordData: any = {
    oldPassword: '',
    newPassword: '',
    ConfirmPassword: ''
  };
  successMessage: string;
  errorMessage: string;

  constructor(public nav: NavController, private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService, private loaderService: LoaderService, private toastService: ToastService) {
    this.changePasswordForm = formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmNewPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  changePassword() {
    this.loaderService.showLoading();
    let user = this.storageService.getCredentials();
    let email = user.username;
    this.changePasswordData.oldPassword = this.changePasswordForm.value.currentPassword;
    this.changePasswordData.newPassword = this.changePasswordForm.value.newPassword;
    this.changePasswordData.ConfirmPassword = this.changePasswordForm.value.confirmNewPassword;
    this.authService.changePassword(this.changePasswordData, email)
      .subscribe(
      result => {
        this.toastService.displayToast("Your password updated successfully");
        this.nav.popToRoot();
      },
      error => {
        this.errorMessage = <any>error
        this.loaderService.hideLoading();
      },
      () => this.loaderService.hideLoading());

  }

}
