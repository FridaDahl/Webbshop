import { ProductCategory } from "./ProductCategory";

export class Product{
    constructor(
        public id: number, 
        public name: string, 
        public description: string, 
        public imageUrl: string,
        public price: number,
        public productCategory: ProductCategory[]) {

    }
}