import { createSelector } from '@ngrx/store';
import { ListType } from '../../features/favorite-lists/enums/list-type.enum';
import { selectFavoriteListState } from '../core.state';

export const selectFavoritePatients = createSelector(
  selectFavoriteListState,
  (state) => state.patients,
);

export const selectFavoriteOrders = createSelector(
  selectFavoriteListState,
  (state) => state.orders,
);

export const selectFilterQuery = createSelector(
  selectFavoriteListState,
  (state) => state.filterQuery,
);

export const selectActiveList = createSelector(
  selectFavoriteListState,
  (state) => state.activeListType,
);

export const selectIsActivePatientsList = createSelector(
  selectFavoriteListState,
  (state) => state.activeListType === ListType.PATIENTS,
);

export const selectIsActiveOrdersList = createSelector(
  selectFavoriteListState,
  (state) => state.activeListType === ListType.ORDERS,
);

export const selectFavoriteFilteredPatients = createSelector(
  selectFavoritePatients,
  selectFilterQuery,
  selectIsActivePatientsList,
  (patients, filterQuery, isActivePatientsList) => {
    if (!isActivePatientsList) {
      return patients;
    }
    return patients.filter(patient => patient.firstName.toLowerCase().includes(filterQuery.toLowerCase()))

  },
);

export const selectFavoriteFilteredOrders= createSelector(
  selectFavoriteOrders,
  selectFilterQuery,
  selectIsActiveOrdersList,
  (orders, filterQuery, isActiveOrdersList) => {
    if (!isActiveOrdersList) {
      return orders;
    }
    return orders.filter(order => order.orderName.toLowerCase().includes(filterQuery.toLowerCase()))

  },
);

