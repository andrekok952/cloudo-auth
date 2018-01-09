//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Http } from '@angular/http';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  validateUsername(username){
    console.log("getting into username validation");
    console.log(username);
    return this.http.get('http://HowRU2DayServer2.azurewebsites.net/' + 'auth/validate-username/' + username).map(res => res.json());
}


}
