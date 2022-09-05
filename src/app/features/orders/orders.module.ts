import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../../shared/shared.module";

import { OrdersComponent } from "./orders/orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { OrdersEffects } from "./store/orders.effects";
import { OrdersReducer } from "./store/orders.reducer";

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    StoreModule.forFeature('ordersState', OrdersReducer),
    EffectsModule.forFeature([
      OrdersEffects
    ]),
  ]
})
export class OrdersModule { }
