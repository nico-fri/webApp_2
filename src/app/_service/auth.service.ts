import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  userId: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, public afs: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigateByUrl('/login');
      })
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.SendVerificationMail();
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then((result) => {
          this.router.navigate(['dashboard']);
        }).catch((error) => {
          window.alert(error.message)
        })
    })
  }

  getUserId(): String {
    if(this.afAuth.auth.currentUser == null){
      const user = JSON.parse(localStorage.getItem('user'));
      return user.uid
    }
    else{
      return this.userId = this.afAuth.auth.currentUser.uid;
    }
  }

  userLogout() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null ) ? true : false;
  }
}