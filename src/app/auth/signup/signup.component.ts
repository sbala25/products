import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor( 
    private _authServices: AuthorizationService, 
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  onSubmit(){
    let { name, username, password } = this.signupForm.value;
    if(this.signupForm.valid){
      this._authServices.signup(name, username, password).subscribe(
        res=>{
          this._snackBar.open('Login Success', 'Dismiss', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000
          });
          this.router.navigate(['login']);
        },
        err=>{
          this._snackBar.open('Signup Faild', 'Dismiss', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000
          });
        }
      )
    }
  }

}
