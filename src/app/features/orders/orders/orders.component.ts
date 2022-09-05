import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { selectFavoriteOrders } from "../../../core/favorite-list-store/favorite-list.selectors";
import { OrdersBase } from "../../../shared/common/orders/orders-base";
import { DateService } from "../../../shared/services/date.service";
import { loadOrders } from "../store/orders.actions";
import { selectOrdersViewModel } from "../store/orders.selectors";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent extends OrdersBase implements OnInit {
  readonly ordersViewModel$ = this.store.select(selectOrdersViewModel);

  private readonly selectedOrders$ = this.store.select(selectFavoriteOrders);
  private readonly unsubscribe$ = new Subject<boolean>();

  constructor(
    protected readonly dateService: DateService,
    protected readonly store: Store,
  ) {
    super(dateService, store);
  }

  ngOnInit(): void {
    this.selectOrders();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getOrders(): void {
    this.store.dispatch(loadOrders());
  }

  private selectOrders(): void {
    this.selectedOrders$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(selectedOrders => {
      console.log(selectedOrders);
      
      this.selectedOrders = selectedOrders;
    })
  }
}
