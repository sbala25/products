import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  productId:any = null;
  product: any = {};
  products:{ name:string, price:number, offerPrice: number, imageUrl: string, productId: string }[] =[]
  constructor(
    private _product: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _location:Location
  ) { }

  ngOnInit(): void {
    this._product.getproduct().subscribe((res)=>{
      let data = JSON.stringify(res);
      let data2 = JSON.parse(data);
      if(data !== null){
        this.products = data2;
      }
      
    })
      let resiveData:any = this._location.getState();
      if(resiveData.product===undefined){
        this.router.navigate(['home'])
      }
      else{
        this.product = resiveData.product;
        this.editProductForm.setValue({
          name:this.product.name,
          price:this.product.price,
          offerPrice:this.product.offerPrice,
          imageUrl:this.product.imageUrl
        })
        console.log(this.product)
      }
  }

  editProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    offerPrice: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });
  onSubmit(){
    if(this.editProductForm.valid){
      let { name, price, offerPrice, imageUrl } = this.editProductForm.value;
      this.products.map(el=>{
        if(el.productId == this.product.productId){
          el.name = name;
          el.price = price;
          el.offerPrice = offerPrice;
          el.imageUrl = imageUrl;
        }
      })
      this._product.addProduct(this.products).subscribe(res=>{
        this._snackBar.open('Product edited Successfully', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
        this.router.navigate(['home']);
      },
      err=>{
        this._snackBar.open('Product Not edited', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
      })
    }
  }
}
