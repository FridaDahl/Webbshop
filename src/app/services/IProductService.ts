import { Observable } from "rxjs";
import { Product } from "../models/Product";

export interface IProductService {
    products$: Observable<Product[]>;
    getProduct(): void;
}