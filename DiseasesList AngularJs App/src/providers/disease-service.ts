import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HealthTopic } from '../models/healthTopic';
import { APIConfiguration } from '../constants/app.constants';
import { AuthService } from './auth-service';
import { StorageService } from './storage-service';
import { HttpService } from './http-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the DiseaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class DiseaseService {
    private apiUrl: string;
    private token: string;

    constructor(private http: Http, private apiConfiguration: APIConfiguration, private authService: AuthService, private storageService: StorageService, private httpService: HttpService) {
        this.apiUrl = apiConfiguration.ServerWithApiUrl;
    }
    getHealthTopics(search: string): Observable<any> {

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;


        let params: URLSearchParams = new URLSearchParams();
        var headers = new Headers();

        headers.append('Authorization', 'Bearer' + ' ' + this.token);
        params.set('title', search);

        return this.httpService.get(`${this.apiUrl}HealthTopic/GetByTitle`, { headers: headers, search: params })
            .map(this.httpService.extractData)
            .catch(error => {
                if (error.status == 401) {
                    //get new token
                    return this.authService.getToken().flatMap((newToken) => {
                        //update credentials
                        this.storageService.updateTokenCredentials(newToken.token, newToken.refreshToken);
                        //again call with new headers
                        var newheaders = new Headers();
                        newheaders.append('Authorization', 'Bearer' + ' ' + newToken.token);
                        return this.http.request(`${this.apiUrl}HealthTopic/GetByTitle`, { headers: newheaders, search: params })
                            .map(this.httpService.extractData)
                            .catch(this.httpService.handleError);
                    })
                } else {
                    return Observable.throw(error);
                }
            });
    }

    getHealthTopicById(id:any) : Observable<any>{
        let params: URLSearchParams = new URLSearchParams();
        var headers = new Headers();
        params.set('id',id);
        headers.append('Authorization', 'Bearer' + ' ' + this.token);

        return this.httpService.get(`${this.apiUrl}HealthTopic/GetById`, { headers: headers, search: params })
            .map(this.httpService.extractData)
            .catch(error => {
                if (error.status == 401) {
                    //get new token
                    return this.authService.getToken().flatMap((newToken) => {
                        //update credentials
                        this.storageService.updateTokenCredentials(newToken.token, newToken.refreshToken);
                        //again call with new headers
                        var newheaders = new Headers();
                        newheaders.append('Authorization', 'Bearer' + ' ' + newToken.token);
                        return this.http.request(`${this.apiUrl}HealthTopic/GetById`, { headers: newheaders, search: params })
                            .map(this.httpService.extractData)
                            .catch(this.httpService.handleError);
                    })
                } else {
                    return Observable.throw(error);
                }
            });
    }
}
