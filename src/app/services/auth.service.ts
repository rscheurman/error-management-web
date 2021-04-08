import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any //save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user')
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
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard'])
      })
      this.setUserData(result.user)
    }).catch((e) => {
      window.alert(e.message)
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
    console.log('this is the user data' + user.uid)
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


