import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderRowProduct } from 'src/app/models/OrderRowProduct';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { SendOrderService } from 'src/app/services/send-order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: Order[] = [];
  products: Product[] = [];

  constructor(private service: SendOrderService, private productService: ProductService) { }

  ngOnInit(): void {
    this.service.orders$.subscribe((orders) =>{
      this.orders = orders;       
    });
    this.service.getOrder();

    this.productService.products$.subscribe((products) =>{
      this.products = products;
    });
    this.productService.getProduct();
  } 

  fillProductInfo(orderRows:OrderRowProduct[]): OrderRowProduct[]{
    for(let i = 0; i < orderRows.length; i++){
      let product = this.getProductDetails(orderRows[i].productId);
      orderRows[i].product = product
    }
    return orderRows
  }

  getProductDetails(productId:number): Product {
    var find = this.products.find(x => x.id === productId);
      if (find === undefined) {
        return new Product(0,'','','',0,[])
      }
      return find
  }

  removeOrder(orderId:number){
    this.service.deleteOrder(orderId);
  }
}


    

