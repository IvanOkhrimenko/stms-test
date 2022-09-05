import { Directive } from "@angular/core";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { Store } from "@ngrx/store";
import { addOrderToFavoriteList, removeOrderFromFavoriteList } from "../../../core/favorite-list-store/favorite-list.actions";
import { ColDef } from "../../models/col-def.model";
import { Order } from "../../models/order.model";
import { DateService } from "../../services/date.service";

@Directive()
export abstract class OrdersBase {
  colDefs: ColDef<Order>[] = [
    {
      titleKey: 'stms.grid.order-name',
      propName: 'orderName',
      width: '20%',
      position: 'center',
    },
    {
      titleKey: 'stms.grid.patient',
      propName: '',
      valueFormatter: (value: Order) => {
        return value.patient.fullName;
      },
      width: '20%',
      position: 'center',
    },
    {
      titleKey: 'stms.grid.physician',
      propName: '',
      valueFormatter: (value: Order) => {
        return value.physician.name;
      },
      width: '20%',
      position: 'center',
    },
    {
      titleKey: 'stms.grid.created-at',
      propName: '',
      width: '20%',
      position: 'center',
      valueFormatter: (value: Order) => {
        return value.creationDate.dateTime;
      },
    },
    {
      titleKey: 'stms.grid.favorite',
      propName: '',
      width: '20%',
      position: 'center',
      cellRenderer: {
        component: MatCheckbox,
        inputs: {
          checked: (value: Order) => this.isOrderSelected(value.orderNum)
        },
        outputs: {
          change: (event, patient) => this.addToFavorite(event, patient)
        }
      }
    },
  ];

  protected selectedOrders: Order[] = [];

  constructor(
    protected readonly dateService: DateService,
    protected readonly store: Store) { }

  private isOrderSelected(orderNum: number): boolean {
    if (!this.selectedOrders) {
      return true;
    }

    return this.selectedOrders.some(order => order.orderNum === orderNum);
  }

  private addToFavorite({ checked }: MatCheckboxChange, order: Order): void {
    if (!checked) {
      this.store.dispatch(removeOrderFromFavoriteList({ order }));

      return;
    }

    this.store.dispatch(addOrderToFavoriteList({ order }));
  }
}
