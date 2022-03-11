import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/Product';
import { MockProductService } from 'src/app/services/MockProductsService';
import { MockSendOrderService } from 'src/app/services/MockSendOrderService';
import { ProductService } from 'src/app/services/product.service';
import { SendOrderService } from 'src/app/services/send-order.service';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let productService = new MockProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      providers: [ {provide: SendOrderService, useClass: MockSendOrderService}, {provide: ProductService, useClass: MockProductService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should update orderRow list', () => {
    let testProduct: Product = new Product(76,'Testprodukt1','...', '...',300, []);
    let testProduct2: Product = new Product(77,'Testprodukt2','...', '...',300, []);
    component.products = [testProduct, testProduct2]
    let testOrderRows = component.fillProductInfo([{id: 123, productId: 76, amount: 199, orderId:123}, {id: 321, productId: 77, amount: 100, orderId:321}]);
    console.log(testOrderRows[0]);
    
    expect(testOrderRows).toEqual([{id: 123, productId: 76, amount: 199, orderId:123, product: testProduct}, {id: 321, productId: 77, amount: 100, orderId:321, product: testProduct2}]) 
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


