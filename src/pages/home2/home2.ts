import { Component } from "@angular/core";
import { NavController, AlertController, ModalController, Platform, LoadingController } from 'ionic-angular';
import { Todos} from '../../providers/todos/todos';
//import { SettingsPage } from "../settings/settings";
//import { RecordVoicePage } from "../record-voice/record-voice";
//import { SelectedPage } from "../selected/selected";
//import {AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig} from '@ionic-native/admob-free';



@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html'

})
export class Home2Page {

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  selectedDate: any;
  entries: any;
  showAndroid: boolean;
  entries2: any;
  what: string;
  public isSelected: boolean = false;
  public selectedEntry: any;
  public showToday: boolean = false;
  public showKey: boolean = false;
public showSpinner = true;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public entryService: Todos,
    public modalCtrl: ModalController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    //public admob: AdMobFree
    ) {

  }

   ionViewDidLoad(){

 //   this.entryService.getEntries().then((data) => {
  //    this.entries = data;
    //  console.log(this.entries);
    this.entryService.getEntries().then((data) => {
      this.entries = data;
      this.entries2 = this.entries.filter(
        function (value) {
            return (value.type === 'control' && value.date !== '07:00');
        });
      }).then((data) => {
      this.entries2.sort((a, b) => {
      //  console.log(a.date);
          let left: any = new Date(a.date);
          let right: any = new Date(b.date);
          return right-left;
       // return (direction === "-") ? right - left : left - right;
     });
    //});
    this.showSpinner = false;
   // console.log(this.entries2);
   //  console.log(this.entries);
 //   })
    });
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  ionViewWillEnter(){
    this.presentLoading();
    this.entryService.getEntries().then((data) => {
      this.entries = data;
      this.entries2 = this.entries.filter(
        function (value) {
            return (value.type === 'control' && value.date !== '07:00');
        });
      }).then((data) => {
      this.entries2.sort((a, b) => {
   //     console.log(a.date);
          let left: any = new Date(a.date);
          let right: any = new Date(b.date);
          return right-left;
       // return (direction === "-") ? right - left : left - right;
     });
    //});
    this.date = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.getDaysOfMonth();
    this.showSpinner = false;
    this.showBanner();
  //  console.log(this.entries2);
    //  console.log(this.entries);
 //   })
    });
  }
  viewSettings(){
  //  this.navCtrl.push(SettingsPage);
  }
    showBanner() {

   //          let bannerConfig: AdMobFreeBannerConfig = {
     //            isTesting: false, // Remove in production
       //          autoShow: true,
         //        id: 'ca-app-pub-3695161664533082/5963385773'
           //  };

             //this.admob.banner.config(bannerConfig);

             //this.admob.banner.prepare().then(() => {
                 // success
            // }).catch(e => console.log(e));

         }

         launchInterstitial() {

              //   let interstitialConfig: AdMobFreeInterstitialConfig = {
                //     isTesting: false, // Remove in production
                  //   autoShow: true,
              //       id:'ca-app-pub-3695161664533082/5963385773'
              //   };

                // this.admob.interstitial.config(interstitialConfig);

                // this.admob.interstitial.prepare().then(() => {
                     // success
                  //  }).catch(e => console.log(e));

             }

 captureAudio(){
 //  this.navCtrl.push(RecordVoicePage);
 }
 getDaysOfMonth() {
  this.daysInThisMonth = new Array();
  this.daysInLastMonth = new Array();
  this.daysInNextMonth = new Array();
  this.currentMonth = this.monthNames[this.date.getMonth()];
  this.currentYear = this.date.getFullYear();
  if(this.date.getMonth() === new Date().getMonth()) {
    this.currentDate = new Date().getDate();
    this.showToday = true;
  } else {
    this.currentDate = 999;
    this.showToday = false;
  }
//this.currentDate = 20;

  var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
  for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
    this.daysInLastMonth.push(i);
  }

  var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
  for (var j = 0; j < thisNumOfDays; j++) {
    this.daysInThisMonth.push(j+1);
  }

  var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
  var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
  for (var k = 0; k < (6-lastDayThisMonth); k++) {
    this.daysInNextMonth.push(k+1);
  }
  var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
  if(totalDays<36) {
    for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
      this.daysInNextMonth.push(l);
    }
  }
}
goToLastMonth() {
  this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
  this.getDaysOfMonth();
}
goToNextMonth() {
  this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
  this.getDaysOfMonth();
}
checkEvent(day) {
  var hasEvent = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T00:00:00Z";
  console.log(thisDate1);
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T23:59:59Z";
  this.entries2.forEach(event => {
  //  console.log(event.date);
    if(((event.date >= thisDate1) && (event.date <= thisDate2) )) {
      hasEvent = true;
    }
  });
  return hasEvent;
}
checkHealth(day) {
  var hasHealth = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T00:00:00Z";
  //console.log(thisDate1);
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T23:59:59Z";
  this.entries2.forEach(event => {
  //  console.log(event.date);
    if(((event.date >= thisDate1) && (event.date <= thisDate2) ) && event.health) {
      hasHealth = true;
    }
  });
  return hasHealth;
}
checkMood(day) {
  var hasMood = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T00:00:00Z";
 // console.log(thisDate1);
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T23:59:59Z";
  this.entries2.forEach(event => {
  //  console.log(event.date);
    if(((event.date >= thisDate1) && (event.date <= thisDate2) ) && event.mood) {
      hasMood = true;
    }
  });
  return hasMood;
}
checkMedication(day) {
  var hasMedication = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T00:00:00Z";
 // console.log(thisDate1);
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T23:59:59Z";
  this.entries2.forEach(event => {
  //  console.log(event.date);
    if(((event.date >= thisDate1) && (event.date <= thisDate2) ) && event.medication) {
      hasMedication = true;
    }
  });
  return hasMedication;
}
checkNutrition(day) {
  var hasNutrition = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T00:00:00Z";
 // console.log(thisDate1);
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T23:59:59Z";
  this.entries2.forEach(event => {
  //  console.log(event.date);
    if(((event.date >= thisDate1) && (event.date <= thisDate2) ) && event.nutrition) {
      hasNutrition = true;
    }
  });
  return hasNutrition;
}
checkExcercise(day) {
  var hasExcercise = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T00:00:00Z";
 // console.log(thisDate1);
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T23:59:59Z";
  this.entries2.forEach(event => {
  //  console.log(event.date);
    if(((event.date >= thisDate1) && (event.date <= thisDate2) ) && event.exercise) {
      hasExcercise = true;
    }
  });
  return hasExcercise;
}
selectDate(day) {
  this.isSelected = false;
  this.selectedDate = day;
  this.selectedEntry = new Array();
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T00:00:00Z";
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+"T23:59:59Z";
  this.entries2.forEach(event => {
    if((event.date >= thisDate1) && (event.date <= thisDate2))  {

      console.log(event);
      this.entryService.getSelectedEntries(event._id).then((data) => {
            this.selectedEntry = data;
            this.isSelected = true;
            console.log(this.selectedEntry);
          this.showSelected(event.date);
    }).catch((error) => {
      console.log(error);
    });
  }
  });
  //console.log(this.selectedEntry);
}
showSelected(eventDate: any) {
 // let addModal = this.modalCtrl.create(SelectedPage,  this.selectedEntry );

 // addModal.present();
}
showKeyToggle(){
 // alert(this.showKey
 // );
  if (this.showKey) {
    this.showKey = false;
  } else { this.showKey = true};
}
 }
