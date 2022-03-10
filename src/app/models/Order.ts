import { OrderRowProduct } from "./OrderRowProduct";

export class Order{
    constructor(
        public createdBy: string,
        public paymentMethod: string,
        public totalPrice: number,
        public id: number,
        public companyId: number,
        public orderRows: OrderRowProduct[]  ){
        }
}