import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getErrors(project:string) {
    return this.firestore.collection('projects').doc(project).collection('errors').valueChanges()
  }

  getProjects() {
    return this.firestore.collection('projects').valueChanges()
  }

} 
