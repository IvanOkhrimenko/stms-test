import { createAction, props } from '@ngrx/store';
import { ListType } from '../../features/favorite-lists/enums/list-type.enum';
import { Order } from '../../shared/models/order.model';
import { Patient } from '../../shared/models/patient.model';

function scoped(templateString: TemplateStringsArray) {
  return `[Favorite List] ${templateString[0]}`;
}

export const addPatientToFavoriteList = createAction(
  scoped`Add patient to favorite list`,
  props<{ patient: Patient }>(),
);

export const removePatientFromFavoriteList = createAction(
  scoped`Remove patient from favorite list`,
  props<{ patient: Patient }>(),
);

export const setActiveListType = createAction(
  scoped`Set Active List Type`,
  props<{ list: ListType }>(),
);

export const setFilterQuery = createAction(
  scoped`Set Filter Query`,
  props<{ filterQuery: string }>(),
);

export const addOrderToFavoriteList = createAction(
  scoped`Add order to favorite list`,
  props<{ order: Order }>(),
);

export const removeOrderFromFavoriteList = createAction(
  scoped`Remove patient from favorite list`,
  props<{ order: Order }>(),
);
