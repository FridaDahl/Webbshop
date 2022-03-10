import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[] = [];
  products$: Observable<Product[]> = of(this.products);

  constructor() { }

  addProduct(newProduct: Product ){
    this.products.push(newProduct);
  }

  removeProduct(i: number){
    this.products.splice(i,1);
  }
}
