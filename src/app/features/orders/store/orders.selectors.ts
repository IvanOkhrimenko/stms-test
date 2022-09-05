import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

const selectOrdersState =
  createFeatureSelector<OrdersState>('ordersState');

export const selectOrders = createSelector(
  selectOrdersState,
  (state) => state.orders,
);
export const selectIsLoading = createSelector(
  selectOrdersState,
  (state) => state.loading,
);

export const selectOrdersViewModel = createSelector(
  selectOrders,
  selectIsLoading,
  (patients, isLoading) => ({
    patients,
    isLoading,
  }),
);
