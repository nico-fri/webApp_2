import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../_service/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  hide = true;

  error: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(private router: Router, private _snackBar: MatSnackBar, private authService: AuthService){
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.authService.doLogin(this.loginForm.value)
      this.router.navigateByUrl('/dashboard');

    }
    else{
      this._snackBar.open("Bitte E-Mail Adresse und Passwort eingeben.", "Okay", {
        duration: 4000,
      });
    }
  }
}
