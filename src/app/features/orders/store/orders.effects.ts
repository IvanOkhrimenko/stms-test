import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrdersService } from '../services/patients.service';
import { loadOrders, loadOrdersFailure, loadOrdersSuccess } from './orders.actions';

@Injectable()
export class OrdersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly ordersService: OrdersService,
  ) { }

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      switchMap(() =>
        this.ordersService.getOrders().pipe(
          map((orders) => loadOrdersSuccess({ orders })),
          catchError((error: unknown) => of(loadOrdersFailure({ error }))),
        ),
      ),
    ),
  );
}
