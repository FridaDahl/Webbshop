import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { OrderRowProduct } from 'src/app/models/OrderRowProduct';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { SendOrderService } from 'src/app/services/send-order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  orderRowProducts: OrderRowProduct[] = [];
  showTotal: boolean = false;
  emptyCartMessage: boolean = true;
  totalPriceValue: number = 0;
  disabledCheckOutButton: boolean = true;
  companyId: number = 8;

  showForm:boolean = false;
  paymentMethods: string[] = ['Paypal', 'Card']
  checkOutForm = this.fb.group({
    emailAdress: ['', [Validators.required]],
    payment: new FormControl(this.paymentMethods[2])
  })

  customer: string = '';
  order: Order = new Order(this.customer,'',0,0,0,[]);

  showCheckOutCompleted: boolean = false;
  
  constructor(private service: CartService, private fb: FormBuilder, private sendService: SendOrderService) { }

  ngOnInit(): void {
    this.service.products$.subscribe((dataFromService: Product[]) =>{
      this.products = dataFromService;
      this.hideCheckout();
      this.totalPriceCount();
    })
  }

  remove(i: number){
    this.service.removeProduct(i);
    this.hideCheckout();
    this.totalPriceCountRemove();   
  }

  hideCheckout(){
    if(this.products.length === 0){ 
      this.showTotal = false;
      this.emptyCartMessage = true;
    }
    else {
      this.showTotal = true;
      this.emptyCartMessage = false;
    }
  }

  totalPriceCount(){
    for(let i = 0; i < this.products.length; i++){
      this.totalPriceValue += this.products[i].price;
    }
  }

  totalPriceCountRemove(){
    this.totalPriceValue = 0;
    for(let i = 0; i < this.products.length; i++){
      this.totalPriceValue += this.products[i].price;    
    }
  }

  checkOutToggle(){
    this.disabledCheckOutButton = false;
    this.showForm = true;
  }

  handleSubmit() {
    for(let i=0; i < this.products.length; i++ ){
      this.orderRowProducts.push(new OrderRowProduct(0,this.products[i].id,1,0))
    }
   this.customer = this.checkOutForm.get('emailAdress')?.value;
   this.order = new Order(
     this.customer,
     this.checkOutForm.get('payment')?.value,
     this.totalPriceValue,
     0,
     this.companyId,
     this.orderRowProducts);

     console.log(this.order);
     this.sendService.sendOrder(this.order);

     this.showForm = false;
     this.products = [];
     this.showTotal = false;
     this.showCheckOutCompleted = true;
   
    
    // this.customer = this.checkOutForm.get(firstName).value;
    // this.order = new Order(
    //   this.customer.firstName, 
    //   this.customer.lastName, 
    //   this.customer.email, 
    //   this.customer.paymentMethod, 
    //   this.totalPriceValue, 
    //   1,
    //   this.companyId,
    //   this.products )
    // console.log(this.customer);
  }
}
