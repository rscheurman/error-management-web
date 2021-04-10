import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any //save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public firebase: FirebaseApp,
    public router: Router,
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        ngZone.run(() => {
          router.navigate(['dashboard'])
        })
      } else {
        localStorage.removeItem('user')
        ngZone.run(() => {
          router.navigate(['login'])
        })
      }
    })
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard'])
      })
      this.setUserData(result.user)
    }).catch((e) => {
      window.alert(e.message)
    })
  }

  signIn(email: string, password: string) {
    this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
      return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard'])
          console.log('user logged in')
        })
        this.setUserData(result.user)
      }).catch((e) => {
        window.alert(e.message)
      })
    }).catch((error) => {
      window.alert(error)
    })

  }

  forgotPassword(passwordResetEmail:any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['password-reset/confirm'])
      })
    }).catch((e) => {
      window.alert(e)
    })
  }

  get isLoggedIn(): boolean {
    if(localStorage.getItem('user') != null) {
      return true;
    } else {
      return false;
    }
  }

  setUserData(user:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData:any = {
      // name: user.displayName,
      email: user.email,
      uid: user.uid,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    })
  }
}


