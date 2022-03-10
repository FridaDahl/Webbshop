import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product= {
    id: 0, 
    name:'', 
    description:'', 
    imageUrl:'', 
    price:0,
    productCategory: []  };

    showProduct: Boolean = false;
  constructor(private service: CartService) { }

  ngOnInit(): void {
    if(this.product.imageUrl != null){
      this.showProduct = true;
    }
  }

  addToCart() {
    let newProduct: Product = new Product(this.product.id, this.product.name, this.product.description, this.product.imageUrl, this.product.price, [])
    this.service.addProduct(newProduct);  
  }

}
