import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getErrors() {
    return this.firestore.collection('projects').doc('Connection Tracker').collection('errors').valueChanges()
  }

  getProjects() {
    return this.firestore.collection('projects').valueChanges()
  }

} 
