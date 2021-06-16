import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { unzip } from 'node:zlib';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }
  editError:any

  getErrors(project:string) {
    return this.firestore.collection('projects').doc(project).collection('errors', ref => ref.orderBy('unixTs', 'desc')).valueChanges()
  }

  getProjects() {
    return this.firestore.collection('projects').valueChanges()
  }
  
  getError(project:string, unixTs:number, errorType:string) {
    console.log(`Attempting to retrieve firestore data from doc(${errorType}${unixTs})`)
    var results:any;
    results = this.firestore.doc(`/projects/${project}/errors/${errorType}${unixTs}`).valueChanges()
    return results;
  }

  deleteError(errorType:string, unixTs:number, project:string) {
    this.firestore.doc(`/projects/${project}/errors/${errorType}${unixTs}`).delete().then(element => {
      console.log(`Error: ${errorType}${unixTs} was deleted`)
    }).catch(error => {
      alert(`Oh crap! We have a problem
      
      ${error}

      `)
    })
  }

} 
