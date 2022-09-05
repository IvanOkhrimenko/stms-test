import { createAction, props } from '@ngrx/store';
import { Order } from '../../../shared/models/order.model';

function scoped(templateString: TemplateStringsArray) {
  return `[Orders] ${templateString[0]}`;
}

export const loadOrders = createAction(
  scoped`Load Orders`,
);

export const loadOrdersSuccess = createAction(
  scoped`Load Orders Succes`,
  props<{ orders: Order[] }>(),
);

export const loadOrdersFailure = createAction(
  scoped`Load Orders Failure`,
  props<{ error: unknown }>(),
);