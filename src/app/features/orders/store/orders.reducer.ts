import { Action, createReducer, on } from '@ngrx/store';
import { Patient } from '../../../shared/models/patient.model';
import { loadOrders, loadOrdersFailure, loadOrdersSuccess } from './orders.actions';

export interface OrdersState {
  orders: Patient[];
  loading: boolean;
  error: unknown | null;
}

export const initialFilesState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};


const ordersReducer = createReducer(
  initialFilesState,
  on(loadOrders, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
  })),
  on(loadOrdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);

export function OrdersReducer(
  state: OrdersState | undefined,
  action: Action,
): OrdersState {
  return ordersReducer(state, action);
}
