import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
productList:any;
  constructor( 
    private _product: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._product.getproduct().subscribe((res)=>{
      let data = JSON.stringify(res);
      let data2 = JSON.parse(data);
      this.productList = data2;
    })
  }
  deteteProduct(e:any){
    this.productList = this.productList.filter((el: any)=>{
       if(el.productId != e){
        return el
       }
    })
    this._product.addProduct(this.productList).subscribe(res=>{
      this._snackBar.open('Product Delete Successfully', 'Dismiss', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2000
      });
      this.router.navigate(['home']);
    },
    err=>{
      this._snackBar.open('Product Not Deleted', 'Dismiss', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2000
      });
    })
  }
  editProduct(e:any){
    // this.router.navigateByUrl(['editProduct'])
  }

}
