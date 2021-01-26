import { Injectable } from '@angular/core';
import { DataService } from 'src/app/_service/data.service'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  payments: any;
  paymentData: any;
  isPayment: boolean = false;
  isNotification: boolean = false;
  notificationCounter: number = 0;
  notifications = [];

  constructor(private dataService:DataService) {
    this.getPayments();
   }

  getPayments() {
    this.dataService.getPayments().subscribe(actionArray => {
      this.payments = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as any;
      })
      this.checkPayments();
    });
  }


  checkPayments(){
    if(this.payments !== undefined){
      for (let i = 0; i < this.payments.length; i++) {
        if(this.payments[i].status == "Offen"){
          this.isPayment = true;
        }
      }
      if(this.isPayment){
        for (let i = 0; i < this.notifications.length; i++) {
          if(this.notifications[i].message == "Sie haben noch offene Zahlungen"){
            this.isNotification = true;
          }
        }
        if(!this.isNotification){
          this.notifications.push({icon: "payment", message: "Sie haben noch offene Zahlungen"})
        }
        this.isPayment = false;
      }
      else{
        for (let i = 0; i < this.notifications.length; i++) {
          if(this.notifications[i].message == "Sie haben noch offene Zahlungen"){
            this.notifications.splice(i, 1);
          }
        }
      }
    }
  }

   getNotifications(){
     if(this.notifications === undefined){
       this.checkPayments();
     }
     return this.notifications;
  }

  doUserStoryTwo(){
    this.notifications.push({icon: "error", message: "Pumpmotor ausgefallen. GOLD Vertrag: Dienstleister bereits informiert und in 4 Stunden Vorort."})
    return this.notifications;
  }

  doUserStoryThree(){
    this.notifications.push({icon: "warning", message: "Achtung: Pumpmotor könnte ausfallen"})
    return this.notifications;
  }

  clearNotifications(){
    return this.notifications = [];
  }

}
