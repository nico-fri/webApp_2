import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { System } from 'src/app/_components/add/system.model';
import { AuthService } from 'src/app/_service/auth.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userId: String;

  constructor(private firestore: AngularFirestore, private authService: AuthService) { 
  }

  getSystems() {
    this.userId = this.authService.getUserId();
    return this.firestore.collection('users').doc('_' + this.userId).collection('systems').snapshotChanges();
  }

  createSystem(system: System) {
    return this.firestore.collection('users').doc('_' + this.userId).collection('systems').add(system);
  }

  deleteSystem(systemId: string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('systems').doc(systemId).delete();
  }

  getPayments() {
    this.userId = this.authService.getUserId();
    return this.firestore.collection('users').doc('_' + this.userId).collection('payments').snapshotChanges();
  }

  createPayment(payment: any) {
    return this.firestore.collection('users').doc('_' + this.userId).collection('payments').add(payment);
  }

  updatePayment(payment: any, paymentId: string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('payments').doc(paymentId).update(payment);
  }

  deletePayment(paymentId: string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('payments').doc(paymentId).delete();
  }

  createAddressInformation(address: any) {
    return this.firestore.collection('users').doc('_' + this.userId).collection('address').add(address);
  }

  updateAddressInformation(address: any, addressId: string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('address').doc(addressId).update(address);
  }

  deleteAddressInformation(addressId: string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('address').doc(addressId).delete();
  }

  getAddressInfo() {
    this.userId = this.authService.getUserId();
    return this.firestore.collection('users').doc('_' + this.userId).collection('address').snapshotChanges();
  }

  createContractInfo(contract: any) {
    return this.firestore.collection('users').doc('_' + this.userId).collection('contract').add(contract);
  }

  updateContractInfo(contract: any, contractId: string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('contract').doc(contractId).update(contract);
  }

  getContractInfo() {
    this.userId = this.authService.getUserId();
    return this.firestore.collection('users').doc('_' + this.userId).collection('contract').snapshotChanges();
  }

  getData() {
    this.userId = this.authService.getUserId();
    return this.firestore.collection('users').doc('_' + this.userId).collection('data').snapshotChanges();
  }

  createData(data: any) {
    return this.firestore.collection('users').doc('_' + this.userId).collection('data').add(data);
  }

  deleteData(dataId:string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('data').doc(dataId).delete();
  }

  getPaymentInfo() {
    this.userId = this.authService.getUserId();
    return this.firestore.collection('users').doc('_' + this.userId).collection('paymentInfo').snapshotChanges();
  }

  createPaymentInfo(paymentInfo: any) {
    return this.firestore.collection('users').doc('_' + this.userId).collection('paymentInfo').add(paymentInfo);
  }

  deletePaymentInfo(paymentInfoId:string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('paymentInfo').doc(paymentInfoId).delete();
  }

  updatePaymentInfo(paymentInfo: any, paymentInfoId: string) {
    this.firestore.collection('users').doc('_' + this.userId).collection('paymentInfo').doc(paymentInfoId).update(paymentInfo);
  }
}
