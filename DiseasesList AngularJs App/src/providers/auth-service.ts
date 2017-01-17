import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { APIConfiguration } from '../constants/app.constants';
import { OAuthClient } from '../constants/app.constants';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { StorageService } from './storage-service';
import { NetworkService } from './network-service';
import { HttpService } from './http-service';
import { CustomQueryEncoder } from '../custom/CustomQueryEncoder';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuthService {
    public token: string;
    private apiUrl: string;
    private tokenUrl: string;
    private clientId: string;
    private clientSecret: string;
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private apiConfiguration: APIConfiguration, private oauthClient: OAuthClient, private storageService: StorageService, private networkService: NetworkService, private httpService: HttpService) {
        this.apiUrl = apiConfiguration.ServerWithApiUrl;
        this.tokenUrl = apiConfiguration.TokenUrl;
        this.clientId = oauthClient.clientId;
        this.clientSecret = oauthClient.clientSecret;
    }

    login(loginData: any): Observable<any> {
        var data = this.getAuthData(loginData);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.httpService.post(this.tokenUrl, data, { headers: headers })
            .map(this.httpService.extractData)
            .catch(this.httpService.handleError);

    }

    register(registerData: Object): Observable<any> {
        let data = JSON.stringify(registerData);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpService.post(`${this.apiUrl}account/register`, data, { headers: headers })
            .map(this.httpService.extractData)
            .catch(this.httpService.handleError);
    }

    isTokenExpired() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        console.log(this.jwtHelper.getTokenExpirationDate(this.token));
        console.log(this.jwtHelper.isTokenExpired(this.token));
        return this.jwtHelper.isTokenExpired(this.token);
    }

    //get new access token when token expired
    getToken() {
        var data = this.getRefreshAuthData();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //get new token
        return this.httpService.post(`${this.tokenUrl}`, data, { headers: headers })
            .map((response: Response) => {
                let access_token = response.json() && response.json().access_token;
                let refresh_token = response.json() && response.json().refresh_token;
                let result = { token: access_token, refreshToken: refresh_token };
                return result;
            })
            .catch(this.httpService.handleError);
    }

    getUserDetail(email) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email);
        return this.httpService.get(`${this.apiUrl}account/GetUserByEmail`, { search: params })
            .map(this.httpService.extractData)
            .catch(this.httpService.handleError);
    }

    editProfile(profileData, email) {
        let data = JSON.stringify(profileData);
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpService.put(`${this.apiUrl}account/editProfile`, data, { search: params, headers: headers })
            .map(this.httpService.extractData)
            .catch(this.httpService.handleError);
    }

    changePassword(userCredentials, email) {
        let data = JSON.stringify(userCredentials);
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpService.post(`${this.apiUrl}account/ChangePassword`, data, { search: params, headers: headers })
            .map(this.httpService.extractData)
            .catch(this.httpService.handleError);
    }

    private getAuthData(loginData: any) {
        let params = new URLSearchParams('', new CustomQueryEncoder());
        params.append('username', loginData.username);
        params.append('password', loginData.password);
        params.append('grant_type', 'password');
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);
        let user = params.toString();
        return user;
    }
    private getRefreshAuthData() {
        let user = this.storageService.getCredentials();
        this.token = user && user.refreshToken;
        let params = new URLSearchParams('', new CustomQueryEncoder());
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', this.token);
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);
        let data = params.toString();
        return data;

    }


}


