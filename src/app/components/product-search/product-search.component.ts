import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchTerm = new Subject<string>();
  products: Observable<Product[]> = new Observable();
  showResults: boolean = true;
  
  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTermFromUser) => {
        return this.service.searchProduct(searchTermFromUser)
      })
    );
  }

  searchProductText(textFromSearch: string) {
    if(textFromSearch === '' ){
      this.showResults = false;
      return
    }
    this.showResults = true;
    this.searchTerm.next(textFromSearch);
    console.log("hej");
  }

  hideResults(){
    this.showResults = false;
  }

}
