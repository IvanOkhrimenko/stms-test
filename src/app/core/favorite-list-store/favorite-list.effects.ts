import { Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import {
  distinctUntilChanged, filter, map
} from "rxjs/operators";
import { ListType } from "../../features/favorite-lists/enums/list-type.enum";
import { selectRouterState } from "../core.state";
import { setActiveListType } from "./favorite-list.actions";

@Injectable()
export class FavoriteListEffects {

  setActiveListType = createEffect(
    () =>
      this.store.pipe(
        select(selectRouterState),
        filter(router => !!router?.state?.url),
        map(router => router.state.url),
        distinctUntilChanged(),
        map(url => setActiveListType({ list: this.detectListType(url) }))
      )
  );

  constructor(
    private store: Store,
  ) { }

  private detectListType(url: string): ListType {
    if (url.includes(ListType.ORDERS)) {
      return ListType.ORDERS;
    } else if (url.includes(ListType.PATIENTS)) {
      return ListType.PATIENTS;
    } else {
      return ListType.PATIENTS;
    }
  }
}