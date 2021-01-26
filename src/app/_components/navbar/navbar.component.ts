import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { NotificationService } from 'src/app/_service/notification.service'
import { DataService } from 'src/app/_service/data.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  route: string;
  counter: number;
  notifications : any;
  darkMode: boolean = false;

  constructor(location: Location, private router: Router, private authService: AuthService, private notificationService:NotificationService, private dataService:DataService, private _snackBar: MatSnackBar) {
    router.events.subscribe((val) => {
      if (location.path() == '/dashboard') {
        this.route = "Dashboard";
      }
      if (location.path() == '/add') {
        this.route = "Hinzufügen";
      }
      if (location.path() == '/payment') {
        this.route = "Zahlungen";
      }
      if (location.path() == '/order') {
        this.route = "Beauftragen";
      }
      if (location.path() == '/settings') {
        this.route = "Einstellungen";
      }
    });
    this.getPayments();
  }

  ngOnInit() {
    this.getNotifications();
  }

  getPayments() {
    this.dataService.getPayments().subscribe(actionArray => {
      this.getNotifications();
    });
  }

  getNotifications(){
    this.notifications = this.notificationService.getNotifications();
    setTimeout(() => {
      if(this.notifications.length >= 1){
        this.counter = this.notifications.length
      }
      else{
        this.counter = null;
      }
    }, 0) ;

  }

  userLogout() {
    this.authService.userLogout();
  }

  doUserStoryTwo(){
    this._snackBar.open("Fehler: Pumpmotor ausgefallen", "", {
      duration: 8000,
      panelClass: ['error-snackbar']
    });
    this.notifications = this.notificationService.doUserStoryTwo();
    if(this.notifications.length >= 1){
      this.counter = this.notifications.length
    }
    else{
      this.counter = null;
    }
  }

  doUserStoryThree(){
    let snackBarRef = this._snackBar.open("Achtung: Pumpmotor könnte ausgefallen", "Beauftragen", {
      duration: 8000,
    });
    snackBarRef.onAction().subscribe(()=> this.routerToOrder());
    this.notifications = this.notificationService.doUserStoryThree();
    if(this.notifications.length >= 1){
      this.counter = this.notifications.length
    }
    else{
      this.counter = null;
    }
  }
    
    routerToOrder(){
      this.router.navigateByUrl('/order');
    }

  clearNotification(){
    this.notifications = this.notificationService.clearNotifications();
    if(this.notifications.length >= 1){
      this.counter = this.notifications.length
    }
    else{
      this.counter = null;
    }
  }

}
