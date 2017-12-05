import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Todos } from '../../providers/todos/todos';
import { UsernameValidator } from '../../validators/username';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
//
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(public nav: NavController, public http: Http, public todoService: Todos,
    public formBuilder: FormBuilder,
    public userNameValidator: UsernameValidator) {


this.signupForm = formBuilder.group({
  name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
username: ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')
,userNameValidator.checkUsername.bind(userNameValidator)])],
email: ['',Validators.compose([Validators.email, Validators.required])],
password: ["", Validators.compose([Validators.required])],
confirmPassword: ["",Validators.compose([Validators.required])]
})
  }
  register(){

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };

      this.http.post('http://howru2dayserver2.azurewebsites.net/auth/register', JSON.stringify(user), {headers: headers})
        .subscribe(res => {
          this.todoService.init(res.json());
          this.nav.setRoot(HomePage);
        }, (err) => {
          console.log(err);
        });

  }

}
