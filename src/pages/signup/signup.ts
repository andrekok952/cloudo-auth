import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Todos } from '../../providers/todos/todos';
//import { UsernameValidator } from '../../validators/username';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
//
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  public submitAttempt: boolean = false;
  public emailError: any;
  public usernameError: any;
  public passwordError: any;

  constructor(public nav: NavController, public http: HttpClient, public todoService: Todos,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController
   ) {


this.signupForm = formBuilder.group({
  name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
username: ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
//,userNameValidator.checkUsername.bind(userNameValidator)])],
email: ['',Validators.compose([Validators.email, Validators.required])],
password: ["", Validators.compose([Validators.required])],
confirmPassword: ["",Validators.compose([Validators.required])]
})
  }
  register(){
    let loader = this.loadingCtrl.create({
      content: "Registering please wait ...",
      duration: 3000
    });
    loader.present();
this.submitAttempt = true;
this.usernameError = '';
this.passwordError = '';
this.emailError = '';
   //   let headers = new Headers();
    //  headers.append('Content-Type', 'application/json');

      let user = {
        name: this.signupForm.controls['name'].value,
        username: this.signupForm.controls['username'].value,
        email: this.signupForm.controls['email'].value,
        password: this.signupForm.controls['password'].value,
        confirmPassword: this.signupForm.controls['confirmPassword'].value
      };



  //    this.http.get('http://howru2dayserver2.azurewebsites.net/auth/validate-username').subscribe(res => {
  //    console.log(res.json);
  //  }, (err) => {
  //    console.log(err);
  //  });
console.log(user);
      this.http.post('http://howru2dayserver2.azurewebsites.net/auth/register', user, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
        .subscribe(res => {
          alert(`Welcome ${user.name}`);
          this.todoService.init(res);
          this.nav.setRoot(HomePage);
        }, (err: HttpErrorResponse) => {
          if (err.error.validationErrors.username) {
            this.usernameError = err.error.validationErrors.username;}
         // alert(`${err.error.validationErrors.username}`)}
         if (err.error.validationErrors.password) {
           this.passwordError = err.error.validationErrors.password;
         }
         if (err.error.validationErrors.email) {
           this.emailError = err.error.validationErrors.email;
         }
       //   alert(`${this.emailError}`);
          console.log(err.error.validationErrors);
        });

  }

refresh() {
  this.submitAttempt = false;
}
}
