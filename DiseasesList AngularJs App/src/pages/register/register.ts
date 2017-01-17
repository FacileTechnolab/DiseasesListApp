import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/* services */
import { AuthService } from '../../providers/auth-service';
import { LoaderService } from '../../providers/loader-service';
import { ToastService } from '../../providers/toast-service';
/*constants */
import { RegularExpr } from '../../constants/app.constants';
/*validations */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    registerForm: FormGroup;
    errorMessage: string;

    constructor(private nav: NavController, private authService: AuthService, private loaderService: LoaderService,private toastService:ToastService, private formBuilder: FormBuilder, private regExp: RegularExpr) {
        this.registerForm = formBuilder.group({
            firstName: ['', Validators.compose([Validators.maxLength(100), Validators.pattern(this.regExp.namePattern), Validators.required])],
            lastName: ['', Validators.compose([Validators.maxLength(100), Validators.pattern(this.regExp.namePattern), Validators.required])],
            userName: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.regExp.emailRegx)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.required])]
        });
    }

    register() {
        this.loaderService.showLoading();
        this.authService.register(this.registerForm.value)
            .subscribe(
            result => {
                //redirect to login page
                this.toastService.displayToast('You are registered successfully!');
                this.nav.popToRoot();
            },
            error => {
                this.errorMessage = <any>error
                this.loaderService.hideLoading();
            },
            () => this.loaderService.hideLoading()); //finally hide loader
    }
}
