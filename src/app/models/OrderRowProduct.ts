import { Product } from "./Product";

export class OrderRowProduct{
    constructor(
        public id: number,
        public productId: number,
        public amount: number,
        public orderId:number,
        public product?: Product,
        
    ){

    }
}
