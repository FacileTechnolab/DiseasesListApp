import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { NetworkService } from './network-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {

  constructor(private http: Http, private networkService: NetworkService) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
      return Observable.throw('');
    } else { return this.http.get(url, options) }
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
      return Observable.throw('');
    } else {
      return this.http.post(url, body, options)
    }
  }
  
  put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
      return Observable.throw('');
    } else { return this.http.put(url, body, options) }
  }

  request(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
      return Observable.throw('');
    } else { return this.http.request(url, options) }
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status != 0) {
        try {
          const body = error.json() || '';
          const err = body.message || body.error_description || JSON.stringify(body);
          errMsg = err;
        }
        catch (exception) {
          errMsg = 'Sorry something went wrong.please try again!';
        }
      }
      else {
        errMsg = 'Sorry something went wrong.please try again!';
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
