import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/Product';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHostComponent, ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the name'), () => {
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.innerHTML).toBe('The Dark Knight');
    expect(compiled.querySelector('h4')?.innerHTML).toBe('199');
  }

});
@Component({
  template: `<app-product [product]="dataToSendToUser"></app-product>`
})
class TestHostComponent {
  dataToSendToUser: Product = {id:999, name: 'The Dark Knight', description:'...', imageUrl: '...', price: 199, productCategory: [] }
}
