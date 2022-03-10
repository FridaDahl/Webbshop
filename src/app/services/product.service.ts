import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = new Subject<Product[]>();
  public products$: Observable<Product[]> = this.products.asObservable();

  private categories = new Subject<Category[]>();
  public categories$: Observable<Category[]> = this.categories.asObservable();

  constructor(private http: HttpClient) { }
  
  getProduct(): void {
    this.http.get<Product[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products')
    .subscribe((products) => {
      this.products.next(products);
    });
  }

  searchProduct(searchTerm:string): Observable<Product[]>{
      return this.http
     .get<Product[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/search'+ "?=" + searchTerm)
     .pipe(map((data: Product[]) => data))
   }

  getCategory(){
    this.http.get<Category[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories')
    .subscribe((categories) => {
      this.categories.next(categories);
    })
  } 
}
