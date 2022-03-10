import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filtredProducts: Product[] = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.products$.subscribe((products) => {
      this.products = products;
      this.filtredProducts = this.products;
      // console.log(this.products); 
    });
    this.service.getProduct();

    this.service.categories$.subscribe((categories) =>{
      this.categories = categories;
    });
    this.service.getCategory();
    
  }

  filterByCategory(categoryId: number){
    if(categoryId === -1){
      this.filtredProducts = this.products;
      return
    }
    this.filtredProducts = this.products.filter(prod => prod.productCategory.findIndex(i => i.categoryId === categoryId)>=0)
  }
}
