import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { HttpClient } from  '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  db = getDatabase();
  url = 'https://product-52be8-default-rtdb.firebaseio.com/product.json'
  constructor(private _http: HttpClient) {
   }

  // addProduct(name: string, price: number, offerPrice: number, imageUrl: string, productId: string) {
  //   return from(set(ref(this.db, 'product/' + productId), {
  //     name: name,
  //     price: price,
  //     offerPrice : offerPrice,
  //     imageUrl: imageUrl,
  //     productId: productId
  //   }))
  // }

  addProduct(product:any[]) {
    return from(this._http.put(this.url, product))
  }

  getproduct() {
    return from(this._http.get(this.url));

  }
  
}

