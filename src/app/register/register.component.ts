import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_service/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordconfirm: new FormControl('', Validators.required),
    checkedAgb: new FormControl('')
  });

  hide = true;
  errorMessage: string;
  successMessage: string;



  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.registerForm.value.email.hasError('required') ? 'You must enter a value' :
      this.registerForm.value.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    if (this.registerForm.valid && this.confirmPassword()) {
      this.tryRegister(this.registerForm.value);
    }
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Aktivierungslink wurde per E-Mail versandt.";
        this._snackBar.open(this.successMessage, "Okay", {
          duration: 4000,
        });
      }, err => {
        console.log(err.message)
        if(err.message === "The email address is badly formatted."){
          this.errorMessage = "Die E-Mail-Adresse ist falsch formatiert.";
        }
        else if(err.message === "Password should be at least 6 characters"){
          this.errorMessage = "Das Passwort sollte mindestens aus 6 Zeichen bestehen."
        }
        else if(err.message === "The email address is already in use by another account."){
          this.errorMessage = "Die E-Mail Adresse wird bereits verwendet."
        }
        else{
          this.errorMessage = "Die E-Mail Adresse oder das Passwort sind falsch.";
        }
        this.successMessage = "";
        this._snackBar.open(this.errorMessage, "Okay", {
          duration: 4000,
        });
      })
    }

  confirmPassword() {
    if (this.registerForm.value.password == this.registerForm.value.passwordconfirm) {
      return true;
    }
    else {
      this._snackBar.open("Passwörter stimmen nicht überein.", "Okay", {
        duration: 4000,
      });
      return false;
    }
  }

  checkAGB(){
    if (this.registerForm.value.checkedAgb == true) {
      return true;
    }
    else {
      this._snackBar.open("Die AGB muss akzeptiert werden.", "Okay", {
        duration: 4000,
      });
      return false;
    }
  }
  



}
