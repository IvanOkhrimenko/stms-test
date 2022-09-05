import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "patients",
    pathMatch: "full"
  },
  {
    path: "patients",
    loadChildren: () =>
      import("./features/patients/patients.module").then(m => m.PatientsModule)
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./features/orders/orders.module").then(m => m.OrdersModule)
  },
  {
    path: "favorite-list",
    loadChildren: () =>
      import("./features/favorite-lists/favorite-list.module").then(m => m.FavoriteListModule)
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./features/settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: "**",
    redirectTo: "patients"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
