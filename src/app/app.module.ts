import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Todos } from '../providers/todos/todos';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { UsernameValidator } from '../validators/username';
import { FormsModule } from '@angular/forms';
import { Home2Page } from '../pages/home2/home2';
//import { EntriesProvider } from '../providers/entries/entries';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Home2Page,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Home2Page,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Todos,
    AuthProvider,
    UsernameValidator,
  //  EntriesProvider
  ]
})
export class AppModule {}
