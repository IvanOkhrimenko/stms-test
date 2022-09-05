import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../../shared/models/order.model';
import { ORDERS_LIST_URL } from '../constants/patients-url.contant';


@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }


    getOrders(): Observable<Order[]> {
        return this.httpClient.get(ORDERS_LIST_URL).pipe(
            map((response: any) => response?.order));
    }
}
