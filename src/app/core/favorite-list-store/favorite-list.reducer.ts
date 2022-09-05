import { Action, createReducer, on } from '@ngrx/store';
import { ListType } from '../../features/favorite-lists/enums/list-type.enum';
import { Order } from '../../shared/models/order.model';
import { Patient } from '../../shared/models/patient.model';
import {
  addOrderToFavoriteList,
  addPatientToFavoriteList,
  removeOrderFromFavoriteList,
  removePatientFromFavoriteList,
  setActiveListType,
  setFilterQuery,
} from './favorite-list.actions';

export interface FavoriteListState {
  patients: Patient[];
  orders: Order[];
  activeListType: ListType;
  filterQuery: string;
}

export const initialFilesState: FavoriteListState = {
  patients: [],
  orders: [],
  activeListType: ListType.PATIENTS,
  filterQuery: '',
};

const reducer = createReducer(
  initialFilesState,
  on(addPatientToFavoriteList, (state, { patient }) => {
    return {
      ...state,
      patients: [...state.patients, patient],
    }
  }),
  on(removePatientFromFavoriteList, (state, { patient }) => {
    return {
      ...state,
      patients: [...state.patients.filter(el => el.code !== patient.code)],
    }
  }),
  on(addOrderToFavoriteList, (state, { order }) => {
    return {
      ...state,
      orders: [...state.orders, order],
    }
  }),
  on(removeOrderFromFavoriteList, (state, { order }) => {
    return {
      ...state,
      orders: [...state.orders.filter(el => el.code !== order.code)],
    }
  }),
  on(setActiveListType, (state, { list }) => {
    return {
      ...state,
      activeListType: list
    }
  }),
  on(setFilterQuery, (state, { filterQuery }) => {
    return {
      ...state,
      filterQuery
    }
  }),
);

export function favoriteListReducer(
  state: FavoriteListState | undefined,
  action: Action,
): FavoriteListState {
  return reducer(state, action);
}
