import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectFavoriteFilteredOrders } from "../../../../core/favorite-list-store/favorite-list.selectors";
import { OrdersBase } from "../../../../shared/common/orders/orders-base";
import { DateService } from "../../../../shared/services/date.service";

@Component({
  selector: "st-orders-list",
  templateUrl: "./orders-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent extends OrdersBase {
  readonly orders$ = this.store.select(selectFavoriteFilteredOrders);

  protected selectedOrders = null;

  constructor(
    protected readonly dateService: DateService,
    protected readonly store: Store) {
    super(dateService, store);
  }
}
