import { Observable } from "rxjs";
import { Order } from "../models/Order";

export interface IOrderService {
    orders$: Observable<Order[]>;
    getOrder(): void;
}