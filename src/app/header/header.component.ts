import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _authServices: AuthorizationService, 
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._authServices.logout().subscribe(
      res=>{
        this._snackBar.open('Logout Success', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
        this.router.navigate(['login']);
      },
      err=>{
        this._snackBar.open('Logout Faild', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
      }
    )
  }

}
