import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  products:{ name:string, price:number, offerPrice: number, imageUrl: string, productId: string }[] =[]
  constructor(
    private _product: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._product.getproduct().subscribe((res)=>{
      let data = JSON.stringify(res);
      let data2 = JSON.parse(data);
      if(data !== null){
        this.products = data2;
      }
      
    })
  }
  addProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    offerPrice: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('https://picsum.photos/seed/picsum/200/300', [Validators.required])
  });
  onSubmit(){
    let { name, price, offerPrice, imageUrl } = this.addProductForm.value;
    if(this.addProductForm.valid){
      let productId = UUID.UUID()
      let newProduct = {
        name, price, offerPrice, imageUrl, productId
      }
      this.products.push(newProduct);
      this._product.addProduct(this.products).subscribe(res=>{
        this._snackBar.open('Product added Successfully', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
        this.router.navigate(['home']);
      },
      err=>{
        this._snackBar.open('Product Not Added Faild', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
      })
      
    }
  }

}
