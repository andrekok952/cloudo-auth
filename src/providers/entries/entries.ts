import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class Entries {

  data: any;
  db: any;
  remote: any;
  dataHealth: any;
  dataMedication: any;
  dataNutrition: any;
  dataMood: any;
  teststring: string = "get this working";
  username: any;
  password: any;
  entry: any;


  constructor() {
 //   PouchDB.plugin(cordovaSqlitePlugin);
    this.db = new PouchDB('wellness');
  //  console.log(this.db.adapter);
    this.username = 'aticamosyseringlarmentse';
    this.password = 'aa3b501852372991e1b42cd5157433e167335322';
    this.remote = 'https://6a698139-8043-4f27-a26b-c11561d191a1-bluemix.cloudant.com/wellness';

    //this.remote = 'http://localhost:5984/wellness';

    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    };
// add a function to do this on a button
    this.db.sync(this.remote, options);

  }
getSelectedEntries(entrydate: string) {
  console.log(entrydate);
  return new Promise(resolve => {
    this.db.allDocs({
      include_docs: true
    }).then((result)=> {
      this.entry= [];
      let docs = result.rows.map((row) => {
        if (row.doc.type != 'control' && row.doc.date === entrydate) {
          console.log(row.doc);
          this.entry.push(row.doc);
        }
      });
      resolve(this.entry);
    })
  } )
}
  getEntries() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
    //      console.log(row.doc);
       //   if (row.doc._id !== 'Invalid date') {
          this.data.push(row.doc);
        //  }
        });
        resolve(this.data);
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  createEntry(entry){
    this.db.post(entry);
  }
  createControl(control){
    this.db.put(control).catch((err) => {
      console.log(err);
    });
  }
  getControl(control){
    let docid = control._id;
    let changedIndex = null;
    this.data.forEach((doc, index) => {

            if(doc._rev === control._rev){
              console.log(index);
              changedIndex = index;
            }

          });
//    console.log(docid);
    this.db.get(docid).then((result) => {
 //     console.log(result);
      if (control.mood) {
        result.mood = control.mood;
      }
      if (control.health) {
        result.health = control.health;
       }
       if (control.medication) {
         result.medication = control.medication;
       }
       if (control.nutrition) {
         result.nutrition = control.nutrition;
       }
       if (control.exercise) {
         result.exercise = control.exercise;
       }
      this.data[changedIndex] = result;
      console.log(result);
      return this.db.put({
        _id: result._id,
        _rev: result._rev,
        type: result.type,
        mood: result.mood,
        date: result.date,
        medication: result.medication,
        health: result.health,
        nutrition: result.nutrition,
        exercise: result.exercise
      });
      }).catch((err) => {
      if (err.name === 'not_found') {
        this.data.push(control);
        return this.db.put(control).catch((err) => {
          console.log(err);
        });
      }
      console.log(err);
    });

  }
  updateEntry(entry){
    this.db.put(entry).catch((err) => {
      console.log(err);
    });
  }

  deleteEntry(entry){
    this.db.remove(entry).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change){
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else  {
        this.data.push(change.doc);
      }

    }
  }

}
