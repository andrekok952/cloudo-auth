import { Component } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import {Home2Page} from '../home2/home2';
import {LoadingController} from 'ionic-angular';
import { Todos } from '../../providers/todos/todos';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;
  public loginError: any;
  constructor(public nav: NavController, public http: HttpClient,
    public todoService: Todos,
    public loadingCtrl: LoadingController) {

  }

  login(){
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
      duration: 3000
    });
    loader.present();
    //  let headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
      this.loginError = '';
      let credentials = {
        username: this.username,
        password: this.password
      };

      this.http.post('http://howru2dayserver2.azurewebsites.net/auth/login'
      , credentials, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
        .subscribe(res => {
          console.log(res);
          this.todoService.init(res);
          this.nav.setRoot(Home2Page);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.loginError = err.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
           this.loginError = err.error.message;
        //    console.log(err.error.message);

          }
        }

       )
        ;

  }
  forgotpassword() {
 //   let loader = this.loadingCtrl.create({
 //     content: "Please wait ...",
 //     duration: 3000
 //   });
  //  loader.present();
    //  let headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
      this.loginError = '';
      let credentials = {
        email: "tester16@test.com",
    //    password: this.password
      };

      this.http.post('http://howru2dayserver2.azurewebsites.net/auth/forgot-password'
      , credentials, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
        .subscribe(res => {
          console.log(res);
       //   this.todoService.init(res);
       //   this.nav.setRoot(HomePage);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log(err);
         //   this.loginError = err.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
         //  this.loginError = err.error.message;
            console.log(err);

          }
        }

       )
        ;

  }

  launchSignup(){
    this.nav.push(SignupPage);
  }

}
