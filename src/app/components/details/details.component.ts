import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  productId: number = 0;
  products: Product[] = []; 
  product: Product = {id:0, name:'', description:'', imageUrl:'', price:0, productCategory:[]};
  show: boolean = false;

  constructor(private route: ActivatedRoute, private service: ProductService, private productService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productId = +p['id'];
    })

    this.service.products$.subscribe((products) => {
      this.products = products;
      
      var find = this.products.find(x => x.id === this.productId);
      if (find === undefined) {
        throw new TypeError;
      }
      this.product = find; 

    })
    this.service.getProduct();
    
  }

  addToCart() {
    let newProductId: Product = new Product(this.product.id, this.product.name, this.product.description, this.product.imageUrl, this.product.price,[])
    this.productService.addProduct(newProductId); 
  }

}
