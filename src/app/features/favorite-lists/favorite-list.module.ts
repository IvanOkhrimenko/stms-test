import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { FavoriteListComponent } from "./components/favorite-list-main/favorite-list-main.component";
import { OrdersListComponent } from "./components/orders-list/orders-list.component";
import { PatientsListComponent } from "./components/patients-list/patients-list.component";
import { FavoriteListRoutingModule } from "./favorite-list-routing.module";

@NgModule({
  declarations: [FavoriteListComponent, PatientsListComponent, OrdersListComponent],
  imports: [
    CommonModule, SharedModule, FavoriteListRoutingModule,
  ],
  providers: []
})
export class FavoriteListModule { }
