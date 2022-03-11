import { Observable, Subject } from "rxjs";
import { Product } from "../models/Product";
import { IProductService } from "./IProductService";

export class MockProductService implements IProductService {
    private products = new Subject<Product[]>();
    public products$: Observable<Product[]> = this.products.asObservable();

    public testData: Product[] = [
        new Product(999, 'Testprodukt', '...', '...', 0, []),
        new Product(998, 'Testprodukt2', '...', '...', 0, []),
        new Product(999, 'Testprodukt3', '...', '...', 0, [])
    ]

    getProduct(): void {
        this.products.next(this.testData)
    }

}