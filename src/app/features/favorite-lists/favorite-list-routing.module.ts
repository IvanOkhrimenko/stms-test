import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FavoriteListComponent } from "./components/favorite-list-main/favorite-list-main.component";
import { OrdersListComponent } from "./components/orders-list/orders-list.component";
import { PatientsListComponent } from "./components/patients-list/patients-list.component";
import { ListType } from "./enums/list-type.enum";

const routes: Routes = [
  {
    path: "",
    component: FavoriteListComponent,
    children: [
      {
        path: "patients",
        component: PatientsListComponent,
        data: { title: "stms.menu.favorite-list-patients" }
      },
      {
        path: "orders",
        component: OrdersListComponent,
        data: { title: "stms.menu.favorite-list-orders" }
      },
      {
        path: "",
        redirectTo: ListType.PATIENTS,
        pathMatch: "full"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteListRoutingModule { }
