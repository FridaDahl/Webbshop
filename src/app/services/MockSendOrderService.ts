import { Observable, Subject } from "rxjs";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { IOrderService } from "./IOrderService";

export class MockSendOrderService implements IOrderService {
    private orders = new Subject<Order[]>();
    public orders$: Observable<Order[]> = this.orders.asObservable();

    private testData: Order[] = []

    getOrder(): void {
        this.orders.next(this.testData)
    }

}