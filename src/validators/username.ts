import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public authProvider: AuthProvider){

  }

  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.authProvider.validateUsername(control.value).subscribe((res) => {
          if(res.ok){
            resolve(null);
          }
        }, (err) => {
          resolve({'usernameInUse': true});
        });

      }, 1000);

    });
  }

}
