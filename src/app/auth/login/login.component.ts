import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authServices: AuthorizationService, 
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  onSubmit(){
    let { username, password } = this.loginForm.value;
    if(this.loginForm.valid){
    this._authServices.login(username, password).subscribe(
      res => {
        this._snackBar.open('Login Success', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
        this.router.navigate(['home']);
      },
      err => {
        this._snackBar.open('Login Faild', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
      }
    )
    }
    
  }
}
